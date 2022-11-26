import FullList from "../model/FullList";

interface DOMList {
    ul: HTMLUListElement;
    clear(): void;
    render(FullList: FullList): void;
}

export default class ListTemplate implements DOMList {

    ul: HTMLUListElement;
    static instance: ListTemplate = new ListTemplate();

    private constructor() {
        this.ul = document.getElementById("listItems") as HTMLUListElement;
    }

    clear(): void {
        this.ul.innerHTML = "";
    }

    render(fullList: FullList): void {
        this.clear(); // clear the list before rendering
        fullList.list.forEach(item => {
            const li = document.createElement("li") as HTMLLIElement;
            li.className = "item";

            const check = document.createElement("input") as HTMLInputElement;
            check.type = "checkbox";
            check.id = item.id;
            check.tabIndex = 0;
            check.checked = item.checked;

            li.append(check);
            check.addEventListener("change", () => {
                item.checked = !item.checked;
                fullList.save();
            });

            const label = document.createElement("label") as HTMLLabelElement;
            label.htmlFor = item.id;
            label.textContent = item.item;
            li.append(label);

            const button = document.createElement("button") as HTMLButtonElement;
            button.className = "delete";
            button.textContent = "X";
            button.tabIndex = 0;
            li.append(button);

            button.addEventListener("click", () => {
                fullList.removeItem(item.id); // it will internally call save()
                this.render(fullList); // re-render the list
                /**
                 * Note: Yes, we are in the render() method, but we are calling it again
                 * to re-render the list. This is not a recursive call, because this will be called only on click of the delete button.
                 */
            });

            // Append the list item to the list
            this.ul.append(li);
        });
    }
}