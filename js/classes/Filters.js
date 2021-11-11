class Filters
{
    constructor(type)
    {
        this.all = new Set();
        this.filtered = new Set();
        this.selected = new Set();
        this.type = type;
    }

    displayTags()
    {
        let html = '';

        this.selected.forEach(tag => {
            html += `<span class="tagsSelected-${this.type} data-filter="${tag}">${tag}
            <svg role="button" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
                    </span>`;
        });

        document.getElementById(`tag-${this.type}`).innerHTML = html;
    }

    renderDropdown()
    {
        document.getElementById("filters").innerHTML =

        `
        <div class="${this.type} dropdown-wrapper " data-type="${this.type}">
            <button id="dropdown-${this.type}">${this.type} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-compact-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"/>
                </svg>
            </button>
            <div class="menu-${this.type}" id="menu-${this.type}">
                <label for="input-${this.type}"></label>
                <input type="search" class="input-${this.type}" id="input-${this.type}">
            </div>
        </div>
        `;
    }
}

export default Filters;