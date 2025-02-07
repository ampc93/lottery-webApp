import React, { useState, useEffect } from "react";
import { 
    Panel, PanelType, TextField, PrimaryButton, DefaultButton, MessageBar, MessageBarType 
} from "@fluentui/react";

const RoleModal = ({ role, onClose, loadRoles, addRole, editRole }) => {
    const [description, setDescription] = useState(role ? role.description || "" : "");
    const [error, setError] = useState("");

    useEffect(() => {
        setDescription(role ? role.description || "" : "");
        setError("");
    }, [role]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!description.trim()) {
            setError("La descripción es obligatoria.");
            return;
        }
        if (description.length < 3) {
            setError("La descripción debe tener al menos 3 caracteres.");
            return;
        }

        const updatedRole = role?._id
            ? { ...role, description }  // Edición
            : { description };          // Creación
        
        try {
            let response = updatedRole._id
                ? await editRole(updatedRole._id, updatedRole)
                : await addRole(updatedRole);
            
            if (response.success) {
                setError("");
                onClose();
                loadRoles();
            } else {
                setError(response.message || "Ocurrió un error inesperado.");
            }
        } catch (error) {
            setError(error.message || "Error al guardar el rol.");
        }
    };

    return (
        <Panel
            isOpen
            onDismiss={onClose}
            type={PanelType.medium}  // ✅ Se abre desde la derecha
            headerText={role ? "Editar Rol" : "Agregar Rol"}
            closeButtonAriaLabel="Cerrar"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <TextField
                    label="Tipo de Acceso"
                    value={description}
                    onChange={(e, newValue) => setDescription(newValue || "")}
                    placeholder="Ingrese la descripción"
                />
                {error && <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>}

                <div className="flex justify-end gap-2 mt-4">
                    <DefaultButton text="Cancelar" onClick={onClose} />
                    <PrimaryButton text="Guardar" type="submit" />
                </div>
            </form>
        </Panel>
    );
};

export default RoleModal;


