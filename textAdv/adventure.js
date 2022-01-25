// Section Class
class Item {
    constructor(id, consumable) {
        this.id = id;
        this.consumable = consumable;
    }
    // get combined() {
    //     return this.open + this.body + this.close;
    // }
    
    // display () {
    //     console.log('Display ' + this.targetID)
    //     // this.target.innerHTML = this.combined;
    //     this.target.style.display = 'block';
    // }
    // hide () {
    //     console.log('Hide')
    //     // this.target.style.display = 'none';
    // }
}

//  Nav Class
class Key extends Item {
    constructor(id, consumable) {
        // Calls constructor of parent class
        super(id, consumable);
    }
    // // Generate HTML for the body of the Nav buttons
    // generateButtons() {
    //     let cont = '';
        
    //     for (let i = 0; i < this.sections.length; i++) {
    //         let sectionID = this.sectionIDs[i];
    //         let section = this.sections[i];
    //         if (this.sections[i] === this.active) {
    //             cont += `<li class="nav-item"><a id="${sectionID}Btn" href="#" class="nav-link active" aria-current="page">${section}</a></li>`
    //         }
    //         else {
    //             cont += `<li class="nav-item"><a id="${sectionID}Btn" href="#" class="nav-link" aria-current="page">${section}</a></li>`
    //         }
    //     }
    //     return cont;
    // }
}