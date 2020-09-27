export function createHeader(state) {
  return `
    <input type="text" class="input" value="${state.title}" />

    <div>
        <div class="button" data-type="delete">
            <i class="material-icons" data-type="delete">delete</i>
        </div>

        <div class="button" data-type="exit">
            <i class="material-icons" data-type="exit">exit_to_app</i>
        </div>
    </div>
  `
}