import './css/style.css';
import FullList from './model/FullList';
import ListItem from './model/ListItem';
import ListTemplate from './templates/ListTemplate';

const initApp = (): void => {
    const fullList = FullList.instance; // Singleton
    const listTemplate = ListTemplate.instance; // Singleton

    const itemEntryForm = document.getElementById("itemEntryForm") as HTMLFormElement;
    itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
        event.preventDefault();
        const input = document.getElementById("newItem") as HTMLInputElement;
        const newEntryText: string = input.value.trim();
        // If the input is empty, do nothing
        if (!newEntryText.length) return;

        const itemId: number = fullList.list.length
            ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
            : 1;

        fullList.addItem(new ListItem(itemId.toString(), newEntryText));
        listTemplate.render(fullList);
    });

    const clearItems = document.getElementById("clearItemsButton") as HTMLButtonElement;
    clearItems.addEventListener("click", (): void => {
        fullList.clearList();
        listTemplate.clear(); // Clear the list in the DOM
    });

    fullList.load(); // Load the list from local storage
    listTemplate.render(fullList); // Render the list in the DOM
};

document.addEventListener("DOMContentLoaded", initApp);