
import React, { useState, useEffect } from "react";
import {
  DetailsList,
  DetailsListLayoutMode,
  PrimaryButton,
  DefaultButton,
  IconButton,
  Panel,
  PanelType,
  TextField,
  Dialog,
  DialogType,
  DialogFooter,
  ResponsiveMode,
  MessageBar,
  MessageBarType
} from "@fluentui/react";
import {
  getOptions,
  addOption,
  editOption,
  removeOption,
  addSubOption,
  removeSubOption,
} from "../../services/optionService";  // Asegúrate de tener estos métodos en tu servicio.

import { initializeIcons } from "@fluentui/react/lib/Icons";
initializeIcons();

const PermissionsPage = () => {
  const [options, setOptions] = useState([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [currentOption, setCurrentOption] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [subOptions, setSubOptions] = useState([]);
  const [formState, setFormState] = useState({
    name: "",
    description: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [optionToDelete, setOptionToDelete] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchOptions = async () => {
      const data = await getOptions();
      setOptions(data);
    };
    fetchOptions();
  }, []);

  const openPanel = (option = null) => {
    setIsPanelOpen(true);
    setCurrentOption(option);

    if (option) {
      setIsEditing(true);
      setFormState({
        name: option.name,
        description: option.description,
      });
      setSubOptions(option.subOptions || []);
    } else {
      setIsEditing(false);
      setFormState({
        name: "",
        description: "",
      });
      setSubOptions([]);
    }
  };

  const closePanel = () => {
    setIsPanelOpen(false);
    setCurrentOption(null);
    setSubOptions([]);
    setErrorMessage("");
  };

  const openDeleteDialog = (option) =>{
    setOptionToDelete(option);
    setIsDialogOpen(true);
  }

  const confirmDelete = async () => {
    if(optionToDelete){
      await removeOption(optionToDelete._id);
      const data = await getOptions();
      setOptions(data);
    }
    setIsDialogOpen(false);
    setOptionToDelete(null);
  }

  const cancelDelete = () =>{
    setIsDialogOpen(false);
    setOptionToDelete(null);
  }

  const handleSave = async () => {

    try {

      let savedOption;
  
      if (!formState.name || !formState.description) {
        setErrorMessage("El nombre y la descripción de la opción principal son obligatorios.");
        return;
      }
  
      if (isEditing) {
        
        savedOption = await editOption(currentOption._id, formState); 
        
      } else {
        savedOption = await addOption(formState); // Agregamos nueva opción principal
      }

      if(savedOption.success) {

          // Validar subopciones antes de guardarlas
          for (const subOption of subOptions) {

              if (!subOption.name || !subOption.description) {
                setErrorMessage("El nombre y la descripción de todas las subopciones son obligatorios.");
                return;
              }
        
              // Validar que los campos adicionales como el ID o clave estén presentes
              if (!savedOption.option._id|| !subOption.name) {
                setErrorMessage("El ID, la clave y el nombre de la subopción son obligatorios.");
                return;
              }
        
              // Solo enviar subopciones nuevas (sin `_id`) a la base de datos
              if (!subOption._id) {
                await addSubOption(savedOption?.option?._id, subOption);
              }

          }

          const data = await getOptions(); // Recargar lista de opciones
          setOptions(data);
          closePanel();
     } 

    } catch (error) {
      setErrorMessage(error.message);
    }

  };

  const handleAddSubOption = () => {
    setSubOptions((prevSubOptions) => [
      ...prevSubOptions,
      { name: "", description: "", isNew: true },
    ]);
  };

  const handleSubOptionChange = (index, field, value) => {
    const updatedSubOptions = [...subOptions];
    updatedSubOptions[index][field] = value;
    setSubOptions(updatedSubOptions);
  };

  const handleRemoveSubOption = async (index) => {

    const subOptionToRemove = subOptions[index];

    if (subOptionToRemove._id) {
      await removeSubOption(currentOption._id, subOptionToRemove._id);
    }

    const updatedSubOptions = subOptions.filter((_, i) => i !== index);

    setSubOptions(updatedSubOptions);

  };

  const columns = [
    {
      key: "name",
      name: "Nombre",
      fieldName: "name",
      minWidth: 100,
      isResizable: true,
    },
    {
      key: "description",
      name: "Descripción",
      fieldName: "description",
      minWidth: 200,
      isResizable: true,
    },
    {
      key: "actions",
      name: "Acciones",
      minWidth: 150,
      onRender: (item) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <IconButton
            iconProps={{ iconName: "Edit" }}
            title="Editar"
            onClick={() => openPanel(item)}
          />
          <IconButton
            iconProps={{ iconName: "Delete" }}
            title="Eliminar"
            onClick={ () => openDeleteDialog(item) }
            style={{ color: "red" }}
          />
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Gestión de Permisos</h1>
      <PrimaryButton
        text="Agregar Opción"
        iconProps={{ iconName: "Add" }}
        onClick={() => openPanel()}
        style={{ marginBottom: "20px" }}
      />
      <DetailsList
        items={options}
        columns={columns}
        layoutMode={DetailsListLayoutMode.justified}
        selectionMode={0}
      />
      <Panel
        isOpen={isPanelOpen}
        onDismiss={closePanel}
        type={window.innerWidth < 768 ? PanelType.smallFixedNear : PanelType.medium}
        headerText={isEditing ? "Editar Opción" : "Agregar Opción"}
        closeButtonAriaLabel="Cerrar"
      >

        {errorMessage && (
          <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
            {errorMessage}
          </MessageBar>
        )}
        <TextField
          label="Nombre"
          value={formState.name}
          onChange={(e, newValue) => setFormState({ ...formState, name: newValue })}
          required
        />
        <TextField
          label="Descripción"
          value={formState.description}
          onChange={(e, newValue) => setFormState({ ...formState, description: newValue })}
          required
        />
        <div style={{ marginTop: "20px" }}>
          <h3>Subopciones</h3>
          {subOptions.map((subOption, index) => (
            <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
              <TextField
                placeholder="Nombre"
                value={subOption.name}
                onChange={(e, newValue) => handleSubOptionChange(index, "name", newValue)}
                required
              />
              <TextField
                placeholder="Descripción"
                value={subOption.description}
                onChange={(e, newValue) => handleSubOptionChange(index, "description", newValue)}
                required
              />
              <IconButton
                iconProps={{ iconName: "Delete" }}
                title="Eliminar Subopción"
                onClick={() => handleRemoveSubOption(index)}
              />
            </div>
          ))}
          <PrimaryButton
            text="Agregar Subopción"
            iconProps={{ iconName: "Add" }}
            onClick={handleAddSubOption}
          />
        </div>
        <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end", gap: "8px" }}>
          <DefaultButton text="Cancelar" onClick={closePanel} />
          <PrimaryButton text="Guardar" onClick={handleSave} />
        </div>
      </Panel>
      {/* Modal de Confirmación */}
      <Dialog
        hidden={!isDialogOpen}
        onDismiss={cancelDelete}
        dialogContentProps={ {
          type: DialogType.normal,
          title: "Confirmar eliminación",
          subText: `¿Estás seguro de que deseas eliminar la opción "${optionToDelete?.name}"?`,
        }}
        modalProps={{
          isBlocking: true,
          responsiveMode: ResponsiveMode.small,
          styles: { main: { minWidth: "300px", maxWidth: "90vw", width: "auto"} }
        }}
      >
          <div style={{ padding: "10px", textAlign: "center" }}>
            <p>Esta acción no se puede deshacer. ¿Deseas continuar?</p>
          </div>
          <DialogFooter styles={{ actions: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px" } }}>
            <DefaultButton onClick={cancelDelete} text="Cancelar"/>
            <PrimaryButton onClick={confirmDelete} text="Eliminar" style={{ backgroundColor: "red", color: "white"}}/>
          </DialogFooter>
      </Dialog>

    </div>
  );
};

export default PermissionsPage;





