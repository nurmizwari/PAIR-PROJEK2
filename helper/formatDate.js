function formatCreatedDate(date){      
     //! untuk format date di home hasilny Jumat, 4 Oktober 1968
            const options = {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            };
            return date.toLocaleDateString("id-ID", options);
          
}

module.exports = formatCreatedDate


//! INI MASIH BELUM TERPAKAI