import React, { useEffect, useState } from 'react';
import {
    DetailsListLayoutMode,
    Selection,
    SelectionMode,
    ShimmeredDetailsList
} from '@fluentui/react';

import { restClient } from '../../services/restClient';
import './pais.css';

export const Pais = () => {
    const [paises, setPaises] = useState(undefined);
    const [filtro, setFiltro] = useState([]);
    const [pais, setPais] = useState();

    useEffect(() => {
        fetchPaises();
    }, []);

    const fetchPaises = async () => {
        const response = await restClient.httpGet('/pais');

        if (!response.length) {
            return;
        }

        setPaises(response.map(item => ({ ...item, nombreDepartamento: item.departamento.nombre })));
    }

    const handleSearchComputadora = value => {
        if (!value) {
            setPaises(undefined);
            setFiltro([]);
            fetchPaises();

            return;
        }

        const dataFilter = paises && paises.filter(item => item.nombre.toUpperCase().includes(value.toUpperCase()));

        setFiltro(dataFilter);
    }

    const seleccion = new Selection({
        onSelectionChanged: () => {
            const itemSeleccionado = seleccion.getSelection();

            setPais(itemSeleccionado.length ? itemSeleccionado[0] : null);

        },
    });

    const columns = [
        { key: 'column1', name: 'Id', fieldName: 'id', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column2', name: 'Nombre País', fieldName: 'nombre', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column3', name: 'Codigo', fieldName: 'codigo', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column3', name: 'DepartamentoId', fieldName: 'departamentoId', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column3', name: 'Nombre Departamento', fieldName: 'nombreDepartamento', minWidth: 100, maxWidth: 200, isResizable: true }
    ]

    return (
        <div>
            <div className="contenedorLista">
                <ShimmeredDetailsList
                    items={filtro.length ? filtro : paises}
                    columns={columns}
                    layoutMode={DetailsListLayoutMode.justified}
                    selection={seleccion}
                    selectionPreservedOnEmptyClick={true}
                    selectionMode={SelectionMode.single}
                    enableShimmer={!paises}
                />
            </div>
        </div>
    )
}