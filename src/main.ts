import './css/style.css'
import FullList from './model/FullList'
import ListItem from './model/ListItem'
import ListTemplate from './templates/ListTemplate'

const initApp = (): void => {
  const fullList = FullList.instance
  const template = ListTemplate.instance

  const itemEntryForm = document.getElementById(
    'itemEntryForm'
  ) as HTMLFormElement

  itemEntryForm.addEventListener('submit', (event: SubmitEvent): void => {
    event.preventDefault()
    const newItem = document.getElementById('newItem') as HTMLInputElement
    const newEntryValue: string = newItem.value.trim()
    if (!newEntryValue) return

    const newEntryID: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
      : 1
    const newListItem = new ListItem(newEntryID.toString(), newEntryValue)
    fullList.addItem(newListItem)
    template.render(fullList)
    newItem.value = ''
  })

  const clearItemsButton = document.getElementById('clearItemsButton')
  clearItemsButton?.addEventListener('click', () => {
    fullList.clearList()
    template.clear()
  })

  fullList.load()
  template.render(fullList)
}

document.addEventListener('DOMContentLoaded', initApp)
