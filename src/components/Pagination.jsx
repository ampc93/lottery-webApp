import React from 'react';
import { Stack, DefaultButton, Text } from '@fluentui/react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <Stack horizontal horizontalAlign="center" tokens={{ childrenGap: 10 }} styles={{ root: { marginTop: 20 } }}>
            <DefaultButton
                text="Anterior"
                iconProps={{ iconName: 'ChevronLeft' }}
                disabled={currentPage === 1}
                onClick={() => onPageChange(prev => Math.max(prev - 1, 1))}
            />
            <Text variant="mediumPlus">{`Página ${currentPage} de ${totalPages}`}</Text>
            <DefaultButton
                text="Siguiente"
                iconProps={{ iconName: 'ChevronRight' }}
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(prev => Math.min(prev + 1, totalPages))}
            />
        </Stack>
    );
};

export default Pagination;
