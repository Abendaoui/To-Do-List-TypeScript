import FullList from '../model/FullList'

interface DOMList {
  ul: HTMLUListElement
  clear(): void
  render(fullList: FullList): void
}

export default class ListTemplate implements DOMList {
  ul: HTMLUListElement

  static instance: ListTemplate = new ListTemplate()

  private constructor() {
    this.ul = <HTMLUListElement>document.getElementById('listItems')
  }

  clear(): void {
    this.ul.innerHTML = ''
  }

  render(fullList: FullList): void {
    this.clear()
    fullList.list.forEach((item) => {
      const li = document.createElement('li') as HTMLLIElement
      li.className = 'item'

      const checkBox = document.createElement('input') as HTMLInputElement
      checkBox.type = 'checkbox'
      checkBox.id = item.id
      checkBox.tabIndex = 0
      checkBox.checked = item.checked
      li.appendChild(checkBox)

      checkBox.addEventListener('change', () => {
        item.checked = !item.checked
        fullList.save()
      })

      const label = document.createElement('label') as HTMLLabelElement
      label.htmlFor = item.id
      label.textContent = item.item
      li.appendChild(label)

      const button = document.createElement('button') as HTMLButtonElement
      button.className = 'button'
      button.textContent = 'X'
      li.appendChild(button)

      button.addEventListener('click', () => {
        fullList.removeItem(item.id)
        this.render(fullList)
      })

      this.ul.appendChild(li)
    })
  }
}
