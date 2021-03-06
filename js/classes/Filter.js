class Filter
{
    constructor(list, type, title)
    {
        this.all = [];
        this.selected = [];
        this.filtered = [];
        this.displayed = [];
        this.recipes = list;
        this.input = '';
        this.type = type;
        this.title = title;
    }

    createDropdown()
    {
        document.getElementById('filters').innerHTML += `<div class="${this.type}Filter filter" id="${this.type}Filter">
                    <div class="filterDesign">
                    <h2 class="filterTitle" id="${this.type}Title">${this.title}</h2>
                    <input name="${this.type}Bar" class="${this.type}Bar filter" id="${this.type}Bar" value="${this.input}">
                    <div id="${this.type}Chevron" class="chevron filter">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down filterChevron" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </div>
                </div>
                <div class="filterContent" id="${this.type}FilterContent"></div>
                </div>`;
    }

    createSelection()
    {
        document.getElementById("filtersSelected").innerHTML += `<div id="filtersSelected-${this.type}"></div>`;
    }

    displayAll()
    {
        let html = "";
        this.displayed.forEach(item => {
            html += `<span class="filter${this.type}" data-id="${item}">${item}</span>`;
        });
        document.getElementById(`${this.type}FilterContent`).innerHTML = html;
    }

    maskAll()
    {
        document.getElementById(`${this.type}FilterContent`).innerHTML = "";
    }

    listen()
    {
        this.listenForResearch();
        this.listenForOpenDropdown();
        this.listenForInput();
    }

    listenForResearch()
    {
        const el = document.getElementById(`${this.type}Bar`);
        const btn = document.getElementById(`${this.type}Title`);

        document.querySelector('body').addEventListener('click', (e) =>
        {
            if(e.target.getAttribute('id') != this.type + 'Title')
             {
                if(e.target.getAttribute('id') != this.type + 'Bar')
                {
                    el.style.display = "none";
                    btn.style.display = "block";
                }
             }
        });
    }

    listenForOpenDropdown()
    {
        const filter = document.getElementById(this.type + 'Filter');
        const bar = document.getElementById(this.type + 'Bar');
        const btn = document.getElementById(this.type + "Title");
        const content = document.getElementById(this.type + 'FilterContent');

        filter.addEventListener('click', () => {
            filter.style.width = "550px";
            if(this.type == "appliance")
            {
                filter.style.height = "170px";
            }
            else
            {
                filter.style.height = "300px";
            }
            btn.style.display = "none";
            content.style.display = "flex";
            bar.style.display = "block";
            document.getElementById(this.type + 'Chevron').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up filterChevron" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/></svg>';
            this.displayAll();
            this.listenForSelection();
            this.listenForCloseDropdown();
            this.input = '';

        });
    }

    listenForCloseDropdown()
    {
        const filter = document.getElementById(this.type + 'Filter');
        const bar = document.getElementById(this.type + 'Bar');
        const btn = document.getElementById(this.type + "Title");
        const content = document.getElementById(this.type + 'FilterContent');
        document.querySelector('body').addEventListener('click', (e) =>
        {
            const closest = e.target.closest("." + this.type + "Filter");
            const closest2 = e.target.closest(".filter" + this.type);

            if ((e.target.getAttribute("id") != this.type + 'Filter') && !closest && !closest2)
            {
                filter.style.width = "180px";
                filter.style.height = "50px";
                content.style.display = "none";
                bar.style.display = "none";
                btn.style.display = "block";
                document.getElementById(this.type + 'Chevron').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down filterChevron" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg>';
                this.maskAll();
                this.input = '';
                document.getElementById(this.type + "Bar").value = '';
                this.displayed = this.filtered;
            }
        });
    }

    listenForSelection()
    {
        document.querySelectorAll(".filter" + this.type).forEach(item => {
            item.addEventListener('click', () => {
                if (!this.selected.includes(item.getAttribute("data-id")))
                {
                    this.selected.push(item.getAttribute("data-id"));
                    this.displaySelection();
                    this.listenForUnselect();
                    this.recipes.filter();
                    this.recipes.display();
                }
            });
        });
    }

    listenForUnselect()
    {
        document.querySelectorAll(".selectionRemove" + this.type).forEach(button => {
            button.addEventListener('click', () => {
                let id = button.getAttribute("data-id");
                let index = this.selected.findIndex((item) => item == id);
                this.selected.splice(index, 1);
                this.displaySelection();
                this.listenForUnselect();
                this.recipes.filter(true);
                this.recipes.display();
                this.input = '';
            });
        });
    }

    listenForInput()
    {
        document.getElementById(this.type + "Bar").addEventListener('input', (e) => {
            this.input = e.target.value;
            this.filterInput();
        });
    }

    filterInput()
    {
        this.displayed = this.filtered.filter(item => {
            return (item.toLowerCase().indexOf(this.input) > -1);
        });
        this.displayAll();
    }

    displaySelection()
    {
        let html = "";
        this.selected.forEach(tag => {
            html += `<span class="${this.type}TagInSelection">${tag} <svg class="selectionRemove${this.type} data-id="${tag}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg></span>`;
        });
        document.getElementById(`filtersSelected-${this.type}`).innerHTML = html;
        this.listenForSelection();
    }

    setup()
    {
        this.createDropdown();
        this.createSelection();
        this.collect(this.recipes.all);
        this.all = this.displayed = this.filtered;
        window.setTimeout(() => {this.listen();}, 500);
    }
}

export default Filter;