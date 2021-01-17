            // เปลี่ยน format Date object ให้เป็น string: dd-M-yy 
            // Input (Date) : Sat Dec 19 2020 07:34:54 GMT+0700
            // Output string (dd-M-yy): 19-Dec-2020 
            let changeEnDateFormat = d => `${('0' + d.getDate()).slice(-2)}-${monthShortNames_en[d.getMonth()]}-${d.getFullYear()}`;

            const monthShortNames_en = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const monthNames_th = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];

            // Input string (dd MM yy) : 13 มกราคม 2563 
            // Output string (dd-M-yy) : 13-Jan-2020 
            let get_en_date = d => `${d.substring(0,2)}-${monthShortNames_en[monthNames_th.indexOf(d.substring(3, d.length-5))]}-${parseInt(d.substring(d.length-4))-543}`;
            
            // Input   (dd-M-yy) : 13-Jan-2020
            // Output (dd MM yy) : 13 มกราคม 2563 
            let get_th_date = d => `${d.substring(0,2)} ${monthNames_th[monthShortNames_en.indexOf(d.substring(3,6))]} ${parseInt(d.substring(7))+543}`;


            // ตัวอย่าง
                // let _selectedDate = "19-Nov-2020"
                // console.log(`input:${_selectedDate}  => output:${get_th_date(_selectedDate)}`);
                // console.log(`input:${get_th_date(_selectedDate)}  =>  output:${get_en_date(get_th_date(_selectedDate))}`);
                // let sample_d = "19 พฤศจิกายน 2563"
                // console.log(get_en_date(sample_d));
                // console.log(`date: ${sample_d.substring(0, 2)}`);
                // console.log(`month: ${sample_d.substring(sample_d.length-4)}`);
                // console.log(`year: ${sample_d.substring(3, sample_d.length-5)}`);
            
            const LA_P_MODEL = "v1/price.json";    

            // var encrypted = CryptoJS.AES.encrypt("v1/price.json", "Secret Passphrase");
            // var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");

            let numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

