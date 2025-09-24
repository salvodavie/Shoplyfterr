import React from "react";
import Item from "./Item";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"

function List({ items, handleRemoveItem, onDecrement, onIncrement }) {
    return (
        <div className="list">
            <SortableContext items={(items ?? []).map(item => item.id)} strategy={verticalListSortingStrategy}>
                {items.map((item) => (
                    <Item 
                    key={item.id} 
                    id={item.id} 
                    qty={item.qty}
                    name={item.name} 
                    handleRemoveItem={handleRemoveItem} 
                    onDecrement={onDecrement} 
                    onIncrement={onIncrement}
                    />
                ))}
            </SortableContext>
        </div>
    );
};

export default List;