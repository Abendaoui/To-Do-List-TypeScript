import ListItem from './ListItem'

interface List {
  list: ListItem[]
  load(): void
  save(): void
  clearList(): void
  addItem(itemObj: ListItem): void
  removeItem(id: string): void
}

export default class FullList implements List {
  static instance: FullList = new FullList()

  // We Add Private Identifier Cause We Only Wanna Use it One Time
  private constructor(private _list: ListItem[] = []) {}

  public get list(): ListItem[] {
    return this._list
  }
  public set list(value: ListItem[]) {
    this._list = value
  }

  load(): void {
    const storedList: string | null = localStorage.getItem('myList')
    if (typeof storedList !== 'string') return

    const parsedList: { _id: string; _item: string; _checked: boolean }[] =
      JSON.parse(storedList)

    parsedList.forEach((itemObject) => {
      const newListItem: ListItem = new ListItem(
        itemObject._id,
        itemObject._item,
        itemObject._checked
      )
      FullList.instance.addItem(newListItem)
    })
  }
  save(): void {
    localStorage.setItem('myList', JSON.stringify(this._list))
  }
  clearList(): void {
    this._list = []
    this.save()
  }
  addItem(itemObj: ListItem): void {
    this._list.push(itemObj)
    this.save()
  }
  removeItem(id: string): void {
    this._list = this._list.filter((item) => item.id !== id)
    this.save()
  }
}
