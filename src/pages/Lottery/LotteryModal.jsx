import React, { useState, useEffect } from "react";
import {
    Panel,
    PanelType,
    TextField,
    PrimaryButton,
    DefaultButton,
    MessageBar,
    MessageBarType,
    Toggle
} from "@fluentui/react";

const LotteryModal = ({ lottery, onClose, loadLotteries, addLottery, editLottery }) => {

    const [description, setDescription] = useState(lottery ? lottery.description || "" : "");
    const [available, setAvailable] = useState(lottery ? lottery.available || false : true);
    const [logo, setLogo] = useState(lottery ? lottery?.logoBase64 || "" : ""); // Estado para el logo
    const [error, setError] = useState("");


    useEffect(() => {
        setDescription(lottery ? lottery.description || "" : "");
        setAvailable(lottery ? lottery.available || false : true);
        setLogo(lottery?.logoBase64);
        setError("");
    }, [lottery]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1]; // Extraer solo el base64
            setLogo(base64String);  // Asegúrate de que logo sea base64
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!description.trim()) {
            setError("La descripción es obligatoria.");
            return;
        }

        console.log("Enviando logo al backend:", logo);
        const updatedLottery = lottery?._id
            ? {
                ...lottery,
                description,
                available,
                logo
            }
            : {
                description,
                available,
                logo
            };

        try {
            let response = updatedLottery._id
                ? await editLottery(updatedLottery._id, updatedLottery)
                : await addLottery(updatedLottery);

            setError("");
            onClose();
            loadLotteries();
        } catch (error) {
            setError(error.message || "Error al guardar la lotería.");
        }
    };

    return (
        <Panel
            isOpen
            onDismiss={onClose}
            type={PanelType.medium}
            headerText={lottery ? "Editar Lotería" : "Agregar Lotería"}
            closeButtonAriaLabel="Cerrar"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <TextField
                    label="Descripción"
                    value={description}
                    onChange={(e, newValue) => setDescription(newValue || "")}
                    placeholder="Ingrese la descripción"
                />

                <Toggle
                    label="Estado"
                    checked={available}
                    onChange={(e, checked) => setAvailable(checked)}
                    onText="Activo"
                    offText="Inactivo"
                />

                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                />

                {logo && (
                    <div>
                        <img 
                            src={`data:image/jpeg;base64,${logo}`} 
                            alt="Logo Preview" 
                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                    </div>
                )}

                {error && <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>}

                <div className="flex justify-end gap-2 mt-4">
                    <DefaultButton text="Cancelar" onClick={onClose} />
                    <PrimaryButton text="Guardar" type="submit" />
                </div>
            </form>
        </Panel>
    );
};

export default LotteryModal;


// import React, { useState, useEffect } from "react";
// import {
//     Panel,
//     PanelType,
//     TextField,
//     PrimaryButton,
//     DefaultButton,
//     MessageBar,
//     MessageBarType,
//     Toggle
// } from "@fluentui/react";
// import { useAuth } from '../../context/authContext.jsx';

// const LotteryModal = ({ lottery, onClose, loadLotteries, addLottery, editLottery }) => {
//     const { user } = useAuth();
//     const [description, setDescription] = useState(lottery ? lottery.description || "" : "");
//     const [available, setAvailable] = useState(lottery ? lottery.available || false : true);
//     const [logo, setLogo] = useState(lottery ? lottery.logo || "" : ""); // Estado para el logo
//     const [error, setError] = useState("");

//     console.log(lottery.logo);

//     useEffect(() => {
//         setDescription(lottery ? lottery.description || "" : "");
//         setAvailable(lottery ? lottery.available || false : true);
//         setLogo(lottery ? lottery.logo || "" : "");
//         setError("");
//     }, [lottery]);

//     const handleImageChange = (e) => {

//         const file = e.target.files[0];
//         const reader = new FileReader();

//         reader.onloadend = () => {
//             const base64String = reader.result.split(',')[1]; // Extraer solo el base64
//             setLogo(base64String);
//         };

//         if (file) {
//             reader.readAsDataURL(file);
//         }

//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!description.trim()) {
//             setError("La descripción es obligatoria.");
//             return;
//         }

//         const updatedLottery = lottery?._id
//             ? {
//                 ...lottery,
//                 description,
//                 available,
//                 logo,
//                 organization_id: user.organization_id
//             }
//             : {
//                 description,
//                 available,
//                 logo,
//                 organization_id: user.organization_id
//             };

//         try {
//             let response = updatedLottery._id
//                 ? await editLottery(updatedLottery._id, updatedLottery)
//                 : await addLottery(updatedLottery);

//             setError("");
//             onClose();
//             loadLotteries();
//         } catch (error) {
//             setError(error.message || "Error al guardar la lotería.");
//         }
//     };

//     return (
//         <Panel
//             isOpen
//             onDismiss={onClose}
//             type={PanelType.medium}
//             headerText={lottery ? "Editar Lotería" : "Agregar Lotería"}
//             closeButtonAriaLabel="Cerrar"
//         >
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <TextField
//                     label="Descripción"
//                     value={description}
//                     onChange={(e, newValue) => setDescription(newValue || "")}
//                     placeholder="Ingrese la descripción"
//                 />

//                 <Toggle
//                     label="Estado"
//                     checked={available}
//                     onChange={(e, checked) => setAvailable(checked)}
//                     onText="Activo"
//                     offText="Inactivo"
//                 />

//                 <input 
//                     type="file" 
//                     accept="image/*" 
//                     onChange={handleImageChange} 
//                 />

//                 { logo && (
//                     <div>
//                         <img 
//                             src={`data:image/png;base64,${logo}`} 
//                             alt="Logo Preview" 
//                             style={{ width: '100px', height: '100px', objectFit: 'cover' }}
//                         />
//                     </div>
//                 )}

//                 {error && <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>}

//                 <div className="flex justify-end gap-2 mt-4">
//                     <DefaultButton text="Cancelar" onClick={onClose} />
//                     <PrimaryButton text="Guardar" type="submit" />
//                 </div>
//             </form>
//         </Panel>
//     );
// };

// export default LotteryModal;

// import React, { useState, useEffect } from "react";
// import {
//     Panel,
//     PanelType,
//     TextField,
//     PrimaryButton,
//     DefaultButton,
//     MessageBar,
//     MessageBarType,
//     Toggle
// } from "@fluentui/react";
// import { useAuth } from '../../context/authContext.jsx';

// const LotteryModal = ({ lottery, onClose, loadLotteries, addLottery, editLottery }) => {
//     const { user } = useAuth(); // Obtenemos el usuario y su organización
//     const [description, setDescription] = useState(lottery ? lottery.description || "" : "");
//     const [available, setAvailable] = useState(lottery ? lottery.available || false : true); // Toggle de activación
//     const [error, setError] = useState("");

//     useEffect(() => {
//         setDescription(lottery ? lottery.description || "" : "");
//         setAvailable(lottery ? lottery.available || false : true);
//         setError("");
//     }, [lottery]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!description.trim()) {
//             setError("La descripción es obligatoria.");
//             return;
//         }

//         // Se construye el objeto de la lotería incluyendo el id de organización y el estado (isActive)
//         const updatedLottery = lottery?._id
//             ? {
//                 ...lottery,
//                 description,
//                 available,
//                 organization_id: user.organization_id // Se añade el id de organización
//             }
//             : {
//                 description,
//                 available,
//                 organization_id: user.organization_id // Se añade el id de organización
//             };

//         try {
//             let response = updatedLottery._id
//                 ? await editLottery(updatedLottery._id, updatedLottery)
//                 : await addLottery(updatedLottery);

//             setError("");
//             onClose();
//             loadLotteries();
//         } catch (error) {
//             setError(error.message || "Error al guardar la lotería.");
//         }
//     };

//     return (
//         <Panel
//             isOpen
//             onDismiss={onClose}
//             type={PanelType.medium}
//             headerText={lottery ? "Editar Lotería" : "Agregar Lotería"}
//             closeButtonAriaLabel="Cerrar"
//         >
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <TextField
//                     label="Descripción"
//                     value={description}
//                     onChange={(e, newValue) => setDescription(newValue || "")}
//                     placeholder="Ingrese la descripción"
//                 />

//                 <Toggle
//                     label="Estado"
//                     checked={available}
//                     onChange={(e, checked) => setAvailable(checked)}
//                     onText="Activo"
//                     offText="Inactivo"
//                 />

//                 {error && <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>}

//                 <div className="flex justify-end gap-2 mt-4">
//                     <DefaultButton text="Cancelar" onClick={onClose} />
//                     <PrimaryButton text="Guardar" type="submit" />
//                 </div>
//             </form>
//         </Panel>
//     );
// };

// export default LotteryModal;

