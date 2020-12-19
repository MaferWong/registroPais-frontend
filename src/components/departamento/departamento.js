import React, { useEffect, useState } from 'react';
import {
    DetailsListLayoutMode,
    Selection,
    SelectionMode,
    ShimmeredDetailsList
} from '@fluentui/react';

import { restClient } from '../../services/restClient';
import './departamento.css';

export const Departamento = () => {
    const [departamentos, setDepartamentos] = useState(undefined);
    const [filtro, setFiltro] = useState([]);
    const [departamento, setDepartamento] = useState();

    useEffect(() => {
        fetchDepartamentos();
    }, []);

    const fetchDepartamentos = async () => {
        const response = await restClient.httpGet('/departamento');

        if (!response.length) {
            return;
        }

        setDepartamentos(response.map(item => ({ ...item })));
    }

    const handleSearchMarca = value => {
        if (!value) {
            setDepartamentos(undefined);
            setFiltro([]);
            fetchDepartamentos();

            return;
        }

        const dataFilter = departamentos && departamentos.filter(item => item.nombre.toUpperCase().includes(value.toUpperCase()));

        setFiltro(dataFilter);
    }

    const seleccion = new Selection({
        onSelectionChanged: () => {
            const itemSeleccionado = seleccion.getSelection();

            setDepartamento(itemSeleccionado.length ? itemSeleccionado[0] : null);

        },
    });

    const columns = [
        { key: 'column1', name: 'Id', fieldName: 'id', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column2', name: 'Nombre Departamento', fieldName: 'nombre', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column3', name: 'Codigo', fieldName: 'codigoAdministrativo', minWidth: 100, maxWidth: 200, isResizable: true }
    ]

    return (
        <div className="">
            <div className="contenedorLista">
                <ShimmeredDetailsList
                    items={filtro.length ? filtro : departamentos}
                    columns={columns}
                    layoutMode={DetailsListLayoutMode.justified}
                    selection={seleccion}
                    selectionPreservedOnEmptyClick={true}
                    selectionMode={SelectionMode.single}
                    enableShimmer={!departamentos}
                />
            </div>
        </div>
    )
}