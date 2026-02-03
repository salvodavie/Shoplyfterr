import React from "react";
import Counter from "./Counter";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DragHandleIcon from '@mui/icons-material/DragHandle';

function Item({ name, id, qty, handleRemoveItem, onDecrement, onIncrement }) {

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style = { transition, transform: CSS.Transform.toString(transform) };


    return (
        <div
            ref={setNodeRef}
            {...attributes}
            style={style}
            className={`item ${isDragging ? 'dragging' : ''}`}
        >
            <DragHandleIcon {...listeners}
                sx={{
                    fontSize: "2rem",
                    color: "rgb(128, 36, 15)",    
                    cursor: "grab",
                    "&:hover": {
                        opacity: 1,
                    },
                    "&:active": {
                        cursor: "grabbing",
                    },
                }} />
            <button className="remove-item" onClick={() => handleRemoveItem(id)}>×</button>
            <span className="item-name">{name}</span>
            <Counter
                qty={qty ?? 0}
                onIncrement={() => onIncrement(id)}
                onDecrement={() => onDecrement(id)}
            />
        </div>
    );
};


export default Item;