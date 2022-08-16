function  formatCreatedDate(dates){
    const created = dates;
    const year = created.getFullYear();
    let month = created.getMonth() + 1;
    let date = created.getDate();

    if(month < 10) {
        month = `0${month}`;
    }

    if(date < 10) {
        date = `0${date}`;
    }
    // console.log(`${date}-${month}-${year}`);
    return `${year}-${month}-${date}`;
    
    // return this.dateOfBirth.toISOString().split("T")[0];
    }

    module.exports= formatCreatedDate