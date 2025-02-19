import React, { useState, useEffect } from 'react';
import LotteryModal from './LotteryModal';
import Pagination from '../../components/Pagination.jsx';
import { getLotteries, removeLottery, addLottery, editLottery, findLotteryByDescription } from '../../services/lotteriesService.js';
import { Stack, TextField, PrimaryButton, DetailsList, DetailsListLayoutMode, SelectionMode, IconButton } from '@fluentui/react';

const LotteryList = () => {
    const [lotteries, setLotteries] = useState([]);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentLottery, setCurrentLottery] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        loadLotteries();
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search) {
                handleSearch();
            } else {
                loadLotteries();
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const loadLotteries = async () => {
        const data = await getLotteries();
        setLotteries(Array.isArray(data.lotteries) ? data.lotteries : []);
        setCurrentPage(1);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar la lotería?')) {
            await removeLottery(id);
            loadLotteries();
        }
    };

    const handleSearch = async () => {
        try {
            const data = await findLotteryByDescription(search);
            setLotteries(Array.isArray(data.lotteries) ? data.lotteries : []);
            setCurrentPage(1);
        } catch (error) {
            console.error('Error al buscar loterías:', error);
        }
    };

    const columns = [
        { key: 'description', name: 'Descripción', fieldName: 'description', minWidth: 200, maxWidth: 400, isResizable: true },
        {
            key: 'logoBase64',
            name: 'Imagen',
            minWidth: 100,
            maxWidth: 150,
            onRender: (lottery) => (
                lottery.logoBase64 ? (
                    <img src={`data:image/png;base64,${lottery.logoBase64}`} alt={lottery.description} 
                        style={{ width: '80px', height: '80px', objectFit: 'contain', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }} />
                ) : (
                    <span>Sin imagen</span>
                )
            )
        },
        {
            key: 'actions',
            name: 'Acciones',
            minWidth: 150,
            onRender: (lottery) => (
                <Stack horizontal tokens={{ childrenGap: 10 }}>
                    <IconButton iconProps={{ iconName: 'Edit' }} title="Editar" onClick={() => { setCurrentLottery(lottery); setIsModalOpen(true); }} />
                    <IconButton iconProps={{ iconName: 'Delete' }} title="Eliminar" onClick={() => handleDelete(lottery._id)} />
                </Stack>
            )
        }
    ];

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = lotteries.slice(startIndex, startIndex + itemsPerPage);

    return (
        <Stack tokens={{ childrenGap: 15 }} className="p-4 sm:p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Gestión de Loterías</h1>

            <Stack horizontal horizontalAlign="space-between" verticalAlign="center" tokens={{ childrenGap: 10 }}>
                <TextField placeholder="Buscar loterías..." value={search} onChange={(e, newValue) => setSearch(newValue || '')} iconProps={{ iconName: 'Search' }} styles={{ root: { maxWidth: 300 } }} />
                <PrimaryButton iconProps={{ iconName: 'Add' }} text="Agregar Lotería" onClick={() => { setCurrentLottery(null); setIsModalOpen(true); }} />
            </Stack>

            <DetailsList
                items={paginatedItems}
                columns={columns}
                selectionMode={SelectionMode.none}
                layoutMode={DetailsListLayoutMode.fixedColumns}
                compact={true}
                styles={{ root: { backgroundColor: 'white', padding: '10px', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' } }}
            />

            <Pagination 
                currentPage={currentPage} 
                totalPages={Math.ceil(lotteries.length / itemsPerPage)} 
                onPageChange={setCurrentPage} 
            />
            
            {isModalOpen && (
                <LotteryModal 
                    lottery={currentLottery}
                    onClose={() => setIsModalOpen(false)}
                    loadLotteries={loadLotteries}
                    addLottery={addLottery}
                    editLottery={editLottery}
                />
            )}
        </Stack>
    );
};

export default LotteryList;


// import React, { useState, useEffect } from 'react';
// import LotteryModal from './LotteryModal';
// import { getLotteries, removeLottery, addLottery, editLottery, findLotteryByDescription } from '../../services/lotteriesService.js';
// import { Stack, TextField, PrimaryButton, DetailsList, DetailsListLayoutMode, SelectionMode, IconButton, DefaultButton } from '@fluentui/react';

// const LotteryList = () => {
//     const [lotteries, setLotteries] = useState([]);
//     const [search, setSearch] = useState('');
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [currentLottery, setCurrentLottery] = useState(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 5;

//     useEffect(() => {
//         loadLotteries();
//     }, []);

//     useEffect(() => {
//         const delayDebounceFn = setTimeout(() => {
//             if (search) {
//                 handleSearch();
//             } else {
//                 loadLotteries();
//             }
//         }, 300);

//         return () => clearTimeout(delayDebounceFn);
//     }, [search]);

//     const loadLotteries = async () => {
//         const data = await getLotteries();
//         setLotteries(Array.isArray(data.lotteries) ? data.lotteries : []);
//         setCurrentPage(1);
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm('¿Estás seguro de que quieres eliminar la lotería?')) {
//             await removeLottery(id);
//             loadLotteries();
//         }
//     };

//     const handleSearch = async () => {
//         try {
//             const data = await findLotteryByDescription(search);
//             setLotteries(Array.isArray(data.lotteries) ? data.lotteries : []);
//             setCurrentPage(1);
//         } catch (error) {
//             console.error('Error al buscar loterías:', error);
//         }
//     };

//     const columns = [
//         { key: 'description', name: 'Descripción', fieldName: 'description', minWidth: 200, maxWidth: 400, isResizable: true },
//         {
//             key: 'logoBase64',
//             name: 'Imagen',
//             minWidth: 100,
//             maxWidth: 150,
//             onRender: (lottery) => (
//                 lottery.logoBase64 ? (
//                     <img src={`data:image/png;base64,${lottery.logoBase64}`} alt={lottery.description} 
//                         style={{ width: '80px', height: '80px', objectFit: 'contain', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }} />
//                 ) : (
//                     <span>Sin imagen</span>
//                 )
//             )
//         },
//         {
//             key: 'actions',
//             name: 'Acciones',
//             minWidth: 150,
//             onRender: (lottery) => (
//                 <Stack horizontal tokens={{ childrenGap: 10 }}>
//                     <IconButton iconProps={{ iconName: 'Edit' }} title="Editar" onClick={() => { setCurrentLottery(lottery); setIsModalOpen(true); }} />
//                     <IconButton iconProps={{ iconName: 'Delete' }} title="Eliminar" onClick={() => handleDelete(lottery._id)} />
//                 </Stack>
//             )
//         }
//     ];

//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const paginatedItems = lotteries.slice(startIndex, startIndex + itemsPerPage);

//     return (
//         <Stack tokens={{ childrenGap: 15 }} className="p-4 sm:p-6 bg-gray-100 min-h-screen">
//             <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Gestión de Loterías</h1>

//             <Stack horizontal horizontalAlign="space-between" verticalAlign="center" tokens={{ childrenGap: 10 }}>
//                 <TextField placeholder="Buscar loterías..." value={search} onChange={(e, newValue) => setSearch(newValue || '')} iconProps={{ iconName: 'Search' }} styles={{ root: { maxWidth: 300 } }} />
//                 <PrimaryButton iconProps={{ iconName: 'Add' }} text="Agregar Lotería" onClick={() => { setCurrentLottery(null); setIsModalOpen(true); }} />
//             </Stack>

//             <DetailsList
//                 items={paginatedItems}
//                 columns={columns}
//                 selectionMode={SelectionMode.none}
//                 layoutMode={DetailsListLayoutMode.fixedColumns}
//                 compact={true}
//                 styles={{ root: { backgroundColor: 'white', padding: '10px', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' } }}
//             />

//             <Stack horizontal horizontalAlign="center" tokens={{ childrenGap: 10 }}>
//                 <DefaultButton text="Anterior" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
//                 <span>Página {currentPage} de {Math.ceil(lotteries.length / itemsPerPage)}</span>
//                 <DefaultButton text="Siguiente" onClick={() => setCurrentPage(prev => (prev < Math.ceil(lotteries.length / itemsPerPage) ? prev + 1 : prev))} disabled={currentPage === Math.ceil(lotteries.length / itemsPerPage)} />
//             </Stack>

//             {isModalOpen && (
//                 <LotteryModal 
//                     lottery={currentLottery}
//                     onClose={() => setIsModalOpen(false)}
//                     loadLotteries={loadLotteries}
//                     addLottery={addLottery}
//                     editLottery={editLottery}
//                 />
//             )}
//         </Stack>
//     );
// };

// export default LotteryList;

// import React, { useState, useEffect } from 'react';
// import LotteryModal from './LotteryModal';
// import { getLotteries, removeLottery, addLottery, editLottery, findLotteryByDescription } from '../../services/lotteriesService.js';
// import { Stack, TextField, PrimaryButton, DetailsList, DetailsListLayoutMode, SelectionMode, IconButton } from '@fluentui/react';

// const LotteryList = () => {
//     const [lotteries, setLotteries] = useState([]);
//     const [search, setSearch] = useState('');
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [currentLottery, setCurrentLottery] = useState(null);

//     useEffect(() => {
//         loadLotteries();
//     }, []);

//     useEffect(() => {
//         const delayDebounceFn = setTimeout(() => {
//             if (search) {
//                 handleSearch();
//             } else {
//                 loadLotteries();
//             }
//         }, 300);

//         return () => clearTimeout(delayDebounceFn);
//     }, [search]);

//     const loadLotteries = async () => {
//         const data = await getLotteries();
//         setLotteries(Array.isArray(data.lotteries) ? data.lotteries : []);
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm('¿Estás seguro de que quieres eliminar la lotería?')) {
//             await removeLottery(id);
//             loadLotteries();
//         }
//     };

//     const handleSearch = async () => {
//         try {
//             const data = await findLotteryByDescription(search);
//             setLotteries(Array.isArray(data.lotteries) ? data.lotteries : []);
//         } catch (error) {
//             console.error('Error al buscar loterías:', error);
//         }
//     };

//     const columns = [
//         { 
//             key: 'description', 
//             name: 'Descripción', 
//             fieldName: 'description', 
//             minWidth: 200, 
//             maxWidth: 400, 
//             isResizable: true 
//         },
//         {
//             key: 'logoBase64',
//             name: 'Imagen',
//             minWidth: 100,
//             maxWidth: 150,
//             onRender: (lottery) => (
//                 lottery.logoBase64 ? (
//                     <img 
//                         src={`data:image/png;base64,${lottery.logoBase64}`} 
//                         alt={lottery.description} 
//                         style={{ 
//                             width: '80px', 
//                             height: '80px', 
//                             objectFit: 'contain', 
//                             borderRadius: '5px',
//                             boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
//                         }}
//                     />
//                 ) : (
//                     <span>Sin imagen</span>
//                 )
//             )
//         },
//         {
//             key: 'actions',
//             name: 'Acciones',
//             minWidth: 150,
//             onRender: (lottery) => (
//                 <Stack horizontal tokens={{ childrenGap: 10 }}>
//                     <IconButton 
//                         iconProps={{ iconName: 'Edit' }} 
//                         title="Editar" 
//                         onClick={() => { setCurrentLottery(lottery); setIsModalOpen(true); }} 
//                     />
//                     <IconButton 
//                         iconProps={{ iconName: 'Delete' }} 
//                         title="Eliminar" 
//                         onClick={() => handleDelete(lottery._id)} 
//                     />
//                 </Stack>
//             )
//         }
//     ];

//     return (
//         <Stack tokens={{ childrenGap: 15 }} className="p-4 sm:p-6 bg-gray-100 min-h-screen">
//             <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Gestión de Loterías</h1>

//             <Stack horizontal horizontalAlign="space-between" verticalAlign="center" tokens={{ childrenGap: 10 }}>
//                 <TextField
//                     placeholder="Buscar loterías..."
//                     value={search}
//                     onChange={(e, newValue) => setSearch(newValue || '')}
//                     iconProps={{ iconName: 'Search' }}
//                     styles={{ root: { maxWidth: 300 } }}
//                 />
//                 <PrimaryButton 
//                     iconProps={{ iconName: 'Add' }} 
//                     text="Agregar Lotería" 
//                     onClick={() => { setCurrentLottery(null); setIsModalOpen(true); }} 
//                 />
//             </Stack>

//             <DetailsList
//                 items={lotteries}
//                 columns={columns}
//                 selectionMode={SelectionMode.none}
//                 layoutMode={DetailsListLayoutMode.fixedColumns}
//                 compact={true}
//                 styles={{ 
//                     root: { 
//                         backgroundColor: 'white', 
//                         padding: '10px', 
//                         borderRadius: '5px',
//                         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
//                     } 
//                 }}
//             />

//             {isModalOpen && (
//                 <LotteryModal 
//                     lottery={currentLottery}
//                     onClose={() => setIsModalOpen(false)}
//                     loadLotteries={loadLotteries}
//                     addLottery={addLottery}
//                     editLottery={editLottery}
//                 />
//             )}
//         </Stack>
//     );
// };

// export default LotteryList;


// import React, { useState, useEffect } from 'react';
// import LotteryModal from './LotteryModal';
// import { getLotteries, removeLottery, addLottery, editLottery, findLotteryByDescription } from '../../services/lotteriesService.js';
// import { Stack, TextField, PrimaryButton, DetailsList, DetailsListLayoutMode, SelectionMode, IconButton } from '@fluentui/react';

// const LotteryList = () => {
//     const [lotteries, setLotteries] = useState([]);
//     const [search, setSearch] = useState('');
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [currentLottery, setCurrentLottery] = useState(null);

//     useEffect(() => {
//         loadLotteries();
//     }, []);

//     useEffect(() => {
//         const delayDebounceFn = setTimeout(() => {
//             if (search) {
//                 handleSearch();
//             } else {
//                 loadLotteries();
//             }
//         }, 300);

//         return () => clearTimeout(delayDebounceFn);
//     }, [search]);

//     const loadLotteries = async () => {
//         const data = await getLotteries();
//         setLotteries(Array.isArray(data.lotteries) ? data.lotteries : []);
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm('¿Estás seguro de que quieres eliminar la lotería?')) {
//             await removeLottery(id);
//             loadLotteries();
//         }
//     };

//     const handleSearch = async () => {
//         try {
//             const data = await findLotteryByDescription(search);
//             setLotteries(Array.isArray(data.lotteries) ? data.lotteries : []);
//         } catch (error) {
//             console.error('Error al buscar loterías:', error);
//         }
//     };

//     const columns = [
//         { 
//             key: 'description', 
//             name: 'Descripción', 
//             fieldName: 'description', 
//             minWidth: 200, 
//             maxWidth: 400, 
//             isResizable: true 
//         },
//         {
//             key: 'actions',
//             name: 'Acciones',
//             minWidth: 150,
//             onRender: (lottery) => (
//                 <Stack horizontal tokens={{ childrenGap: 10 }}>
//                     <IconButton 
//                         iconProps={{ iconName: 'Edit' }} 
//                         title="Editar" 
//                         onClick={() => { setCurrentLottery(lottery); setIsModalOpen(true); }} 
//                     />
//                     <IconButton 
//                         iconProps={{ iconName: 'Delete' }} 
//                         title="Eliminar" 
//                         onClick={() => handleDelete(lottery._id)} 
//                     />
//                 </Stack>
//             )
//         }
//     ];

//     return (
//         <Stack tokens={{ childrenGap: 15 }} className="p-4 sm:p-6 bg-gray-100 min-h-screen">
//             <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Gestión de Loterías</h1>

//             <Stack horizontal horizontalAlign="space-between" verticalAlign="center" tokens={{ childrenGap: 10 }}>
//                 <TextField
//                     placeholder="Buscar loterías..."
//                     value={search}
//                     onChange={(e, newValue) => setSearch(newValue || '')}
//                     iconProps={{ iconName: 'Search' }}
//                     styles={{ root: { maxWidth: 300 } }}
//                 />
//                 <PrimaryButton 
//                     iconProps={{ iconName: 'Add' }} 
//                     text="Agregar Lotería" 
//                     onClick={() => { setCurrentLottery(null); setIsModalOpen(true); }} 
//                 />
//             </Stack>

//             <DetailsList
//                 items={lotteries}
//                 columns={columns}
//                 selectionMode={SelectionMode.none}
//                 layoutMode={DetailsListLayoutMode.fixedColumns}
//                 compact={true}
//                 styles={{ root: { backgroundColor: 'white', padding: '10px', borderRadius: '5px' } }}
//             />

//             {isModalOpen && (
//                 <LotteryModal 
//                     lottery={currentLottery}
//                     onClose={() => setIsModalOpen(false)}
//                     loadLotteries={loadLotteries}
//                     addLottery={addLottery}
//                     editLottery={editLottery}
//                 />
//             )}
//         </Stack>
//     );
// };

// export default LotteryList;

