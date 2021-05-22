const list = [
    {
        "order": 0,
        "name": "a"
    },
    {
        "order": 1,
        "name": "b"
    },
    {
        "order": 2,
        "name": "c"
    },
    {
        "order": 3,
        "name": "d"
    },
    {
        "order": 4,
        "name": "e"
    }
]

const updateList = (list,orderOfDraggedItem,droppedBelowThisOrderItem) => {
    const direction = droppedBelowThisOrderItem < orderOfDraggedItem? "up" : "down"
    const update = list.map((item)=>{
        if (direction == "up") {
            return(
                item.order==orderOfDraggedItem?
                    {...item,order:droppedBelowThisOrderItem+1}:
                item.order > droppedBelowThisOrderItem && item.order <= orderOfDraggedItem?
                    {...item,order:item.order+1}:
                item
            )
        }
        else{
            return(
                item.order==orderOfDraggedItem?
                    {...item,order:droppedBelowThisOrderItem}:
                item.order > orderOfDraggedItem && item.order <= droppedBelowThisOrderItem?
                    {...item,order:item.order-1}:
                item
            )
        }
    })
return update.sort((a, b) => a.order - b.order)
}

const deleteItem = (list, itemOrder) => updateList(list,itemOrder,list.length-1).sort((a, b) => a.order - b.order).slice(0,-1)

// To push an item to top, set draggedBelow: -1
// console.log(updateList(list,0,2))

// To push an item to bottom, set draggedBelow: list.length-1
// console.log(updateList(list,0,list.length-1))

// To delete an item from a list
// console.log(deleteItem(list,2))

console.log(updateList(list,0,2))