import { useEffect, useState } from 'react';
import { closestCorners, DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core"
import { Drawer, Button, Box, Typography, } from '@mui/material';
import './App.css';
import List from './List';
import SaveListModal from './SaveListModal';
import MenuDrawer from './MenuDrawer';
import { arrayMove } from '@dnd-kit/sortable';
import logo from './assets/Logo.png';
import Snackbar from '@mui/material/Snackbar';

/*Local Storage*/
const MASTER_KEY = "shoplyfterr:savedLists";
const ITEMS_KEY = "shoplyfterr:itemsLists";
const CURRENT_KEY = "shoplyterr:curentListId";

function App() {

  const [savedLists, setSavedLists] = useState([]);
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [newList, setNewList] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [currentListId, setCurrentListId] = useState(null);


  /* List Saving, Loading, and Deleting*/

  /*List modification autosave */
  useEffect(() => {
    if (!currentListId) return;

    const t = setTimeout(() => {
      setSavedLists(prev => {
        const next = prev.map(list =>
          list.id === currentListId
            ? { ...list, items: items.map(it => ({ ...it })) }
            : list
        );
        localStorage.setItem(MASTER_KEY, JSON.stringify(next));
        return next;
      });
    }, 400);

    return () => clearTimeout(t);
  }, [items, currentListId]);


  /*List Hydration*/
  useEffect(() => {
    const data = localStorage.getItem(MASTER_KEY);
    if (!data) return;

    try {
      const parsed = JSON.parse(data)

      const isValid =
        Array.isArray(parsed) &&
        parsed.every(item =>
          item &&
          typeof item === "obeject" &&
          "id" in item &&1,
          "name" in item &&
          Array.isArray(item.items)
        )

      if (isValid) {
        setSavedLists(parsed);
      } else {
        console.warn("Hydration failed, error in localstorage");
      }
    } catch (error) {
      console.error("Failed to parse savedLists:", error);
    }
  }, []);


  function handleDeleteList(id) {
    setSavedLists(prevLists => prevLists.filter(list => list.id !== id))
  }

  function handleLoadList(id) {
    const selected = savedLists.find(list => list.id === id);
    if (!selected || !Array.isArray(selected.items)) {
      console.warn("Invalid list, could not load", selected)
    }

    const clonedList = [...selected.items];

    setItems(selected.items.map(it => ({ ...it })));
    setCurrentListId(selected.id)
    setSnackbarOpen(true);
    console.log(`"${selected.name} loaded!"`);
    setSnackbarMessage(`"${selected.name} loaded!"`);

  }

  function handleSaveList(e) {
    e.preventDefault();
    if (newList.trim() === '') return;

    const listObject = {
      id: crypto.randomUUID(),
      name: newList,
      items: [...items]
    }

    setSavedLists(prev => {
      const next = [...prev, listObject]
      localStorage.setItem(MASTER_KEY, JSON.stringify(next))  /*Saves into local storage */
      return next;
    }
    );
    setNewList('');
    setIsSaveModalOpen(false);
    setSnackbarOpen(true)
    setSnackbarMessage(`${newList} saved!`)
    toggleDrawer(false)()
  };


  /*Item addition, editing funciton, hover:scroll,  */
  function handleRemoveItem(id) {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  function handleAddItem(e) {
    e.preventDefault();
    if (newItem.trim() === '') return;

    const itemObject = {
      id: crypto.randomUUID(),
      name: newItem,
      qty: 0
    };

    setItems([...items, itemObject]);
    setNewItem('');
  }

  /*Dnd kit, remeber to add Phone touch compatibility*/
  const getItemPosition = id => items.findIndex(item => item.id === id)

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id === over.id) return;

    setItems(items => {
      const originalPos = getItemPosition(active.id)
      const newPos = getItemPosition(over.id)

      return arrayMove(items, originalPos, newPos)
    })
  };

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: 200,
      tolerance: 5
    }
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 100,
      tolerance: 5
    }
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  /*Drawer*/
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };


  /* Snackbar */

  const handleCloseSnackBar = (_event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  /* Modal */

  const toggleModal = () => {
    setIsSaveModalOpen(prev => !prev);
  };

  /*Counter functions*/

  function onIncrement(id) {
    setItems(prev =>
      prev.map(it =>
        it.id === id ? { ...it, qty: (it.qty ?? 0) + 1 } : it
      )
    );
  }

  function onDecrement(id) {
    setItems(prev =>
      prev.map(it =>
        it.id === id ? { ...it, qty: Math.max(0, (it.qty ?? 0) - 1) } : it
      )
    );
  }


  return (
    <>
      <div className='app-wrapper'>
        {/* Drawer trigger */}
        <Button className="menu-button" onClick={toggleDrawer(true)}>☰</Button>

        <MenuDrawer
          toggleDrawer={toggleDrawer}
          drawerOpen={drawerOpen}
          toggleModal={toggleModal}
          setIsSaveModalOpen={setIsSaveModalOpen}
          savedLists={savedLists}
          handleDeleteList={handleDeleteList}
          handleLoadList={handleLoadList}
        />

        <SaveListModal
          toggleModal={toggleModal}
          isSaveModalOpen={isSaveModalOpen}
          handleSaveList={handleSaveList}
          newList={newList}
          setNewList={setNewList}
          toggleDrawer={toggleDrawer}
        />


        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2500}
          message={snackbarMessage}
          onClose={handleCloseSnackBar}
        />

        <div className='logo-header'>
          <h1>ShopLyfterr</h1>
          <img className='logo' src={logo} alt="Logo" />
        </div>
        <p>Grocery Assistant</p>
        <span className='total-items'>Items:{items.length}</span>

        <form className='new-item-form' onSubmit={handleAddItem}>
          <input type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)}></input>
          <input type='submit'></input><br />
        </form>


        <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners} sensors={sensors}>
          <List
            items={items}
            setItems={setItems}
            handleRemoveItem={handleRemoveItem}
            onDecrement={onDecrement}
            onIncrement={onIncrement}
          />
        </DndContext>

      </div>
    </>
  )
}

export default App;
