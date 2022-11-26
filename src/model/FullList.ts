import ListItem from "./ListItem";

interface List {
    list: ListItem[];
    load(): void,
    save(): void,
    clearList(): void,
    addItem(itemObj: ListItem): void,
    removeItem(id: string): void,
}

class FullList implements List {

    static instance: FullList = new FullList();

    // Singleton: There will be only one instance of this class (One list in our app)
    private constructor(private _list: ListItem[] = []) { }

    get list(): ListItem[] {
        return this._list;
    }

    load(): void {
        const storedList: string | null = localStorage.getItem("myList");

        // type guard
        if (typeof storedList !== "string") return;

        const parsedList: { _id: string, _item: string, _checked: boolean }[]
            = JSON.parse(storedList);

        parsedList.forEach(itemObj => { 
            const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked);
            FullList.instance.addItem(newListItem);
        });
    }

    save(): void {
        localStorage.setItem("myList", JSON.stringify(this._list));
    }

    clearList(): void {
        this._list = [];
        this.save();
    }

    addItem(itemObj: ListItem): void {
        this._list.push(itemObj);
        this.save();
    }

    removeItem(id: string): void {
        this._list = this._list.filter(item => item.id !== id);
        this.save();
    }

    // public static getInstance(): FullList {
    //     if (!FullList.instance) {
    //         FullList.instance = new FullList();
    //     }
    //     return FullList.instance;
    // }
}

export default FullList;