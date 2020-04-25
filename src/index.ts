interface ITask{
    title: string, 
    description: string
}

class Tasks{
    $description: HTMLTextAreaElement;
    $form: HTMLFormElement;
    $tasksView: HTMLDivElement;
    $title: HTMLInputElement;

    constructor(){
        this.$description = document.querySelector( '#description-js' );
        this.$form = document.querySelector( '#form-js' );
        this.$tasksView = document.querySelector( '#tasksView-js' );
        this.$title = document.querySelector( '#title' );

        this.addEvents();
        this.getTasksLocalStorage();
    }

    private getTemplate( task: ITask ): string{
        const template = `<div class="card-body">
        <h2 class="card-title h4">${task.title}</h2>
        <p class="card-text">${task.description}</p>
        <button class="btn btn-danger btn-sm deleteTask-js">Delete</button>
    </div>`
        return template;
    }
    

    private saveLocalStorage( task: ITask ): void{
        if(!localStorage.getItem( 'tasks' )){
            const tasks: [ITask] | object[] = [];
            tasks.push( task )
            localStorage.setItem( 'tasks', JSON.stringify( tasks ) )
        }else{
            const tasks: [ITask] = JSON.parse( localStorage.getItem( 'tasks' ) )
            tasks.push( task )
            localStorage.setItem( 'tasks', JSON.stringify( tasks ) )
        }
    }


    addTask( event : Event ): void{
        event.preventDefault();
        const descriptionValue = this.$description.value;
        const titleValue = this.$title.value;
        const isVoid: boolean = descriptionValue !== '' && titleValue !== '';

        if( isVoid ){

            const task: ITask  = {
                title: titleValue,
                description: descriptionValue,
            }

            this.saveLocalStorage( task )
            
            const divElement = document.createElement( 'div' );
            divElement.classList.add( 'card', 'mb-3' );
            divElement.innerHTML = this.getTemplate( task )
            
            this.$tasksView.prepend( divElement )

            this.$form.reset()
        }else{
            alert('Necesitas agregar datos de la tarea!')
        }
    }

    getTasksLocalStorage(): void{
        const tasks: [ITask] = JSON.parse( localStorage.getItem( 'tasks' ) );
        if( tasks.length ){
            this.$tasksView.innerHTML = '';
            for ( const task of tasks ) {
                const divElement = document.createElement( 'div' )
                divElement.classList.add( 'card', 'mb-3' )
                divElement.innerHTML = this.getTemplate( task )
                this.$tasksView.prepend( divElement )
            }
        };
    }

    addEvents(): void{
        //El evento submit va en el formulario
        this.$form.addEventListener( 'submit', () => this.addTask( event ) );
        this.$tasksView.addEventListener('click', () => this.deleteTask( event ) )
        
    } 

    deleteTask( {target} ): void{
        const isTask = target.classList.contains('deleteTask-js');
        const template = `<div class="card mb-3"><div class="card-body"><h2 class="card-title">Lorem, ipsum dolor.</h2><p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab modi deserunt magnam. Perspiciatis quas in laboriosam iure aliquid pariatur possimus?</p><button class="btn btn-danger btn-sm deleteTask-js">Eliminar</button></div></div><div class="card mb-3"><div class="card-body"><h2 class="card-title">Lorem, ipsum dolor.</h2><p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab modi deserunt magnam. Perspiciatis quas in laboriosam iure aliquid pariatur possimus?</p><button class="btn btn-danger btn-sm deleteTask-js">Eliminar</button></div></div>`
        if( isTask ){
            const title: string = target.parentNode.childNodes[1].innerText; 
            this.$tasksView.removeChild( target.parentNode.parentNode ) 
            this.deleteLocalStorage( title )       
        }

        if( this.$tasksView.innerHTML === '' ){
            this.$tasksView.innerHTML = template;
        }
    }

    deleteLocalStorage( title: string ){
        const tasks: [ITask] = JSON.parse( localStorage.getItem( 'tasks' ) );
        
        for (let i = 0; i < tasks.length; i++) {
            if(tasks[i].title == title){
                tasks.splice(i, 1)
            }     
        }
        
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
}


const tasks1 = new Tasks();