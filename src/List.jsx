import React from "react";
import Item from "./Item";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"

function List({ items, handleRemoveItem }) {
    return (
        <div className="list">
            <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
                {items.map((item) => (
                    <Item key={item.id} id={item.id} name={item.name} handleRemoveItem={handleRemoveItem}/>
                ))}
            </SortableContext>
        </div>
    );
};

export default List;