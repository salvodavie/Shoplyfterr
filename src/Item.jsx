import React from "react";
import Counter from "./Counter";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Item({ name, id, qty, handleRemoveItem, onDecrement, onIncrement}) {

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style = { transition, transform: CSS.Transform.toString(transform) };


    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            className={`item ${isDragging ? 'dragging' : ''}`}
        >
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