
var getConfig={
    'myLiff' : '1654480389-bYdxVVJx',
    'staff_nk' : 'น้องกั้ง โทร 083-666-6318',
    'staff_nk_desc' : 'ประจำออฟฟิศ รอรับคณะวันเดินทาง',
    'staff_nk_pic' : 'https://nangfatravel.com/assets/kang-0836666318.jpg',
    'staff_ud' : 'พี่จง โทร 083-666-6318',
    'staff_ud_desc' : 'รอรับคณะในวันเดินทาง ที่อุดร',
    'staff_ud_pic' : 'https://nangfatravel.com/assets/driver-th-jong.jpg',
    'meeting_location' : 'https://goo.gl/maps/SbSQAM31GeqVmfrF9',
    'meeting_label' : 'ตำแหน่งออฟฟิศด่าน (คลิก)',
    'my_bank_account' : 'ชนาวุธ จันทะพล',
    'bank_name_1' : 'กสิกรไทย',
    'bank_account_1' : '171-265-463-1',
    'bank_color_code_1' : '#138f2d',
    'bank_name_2' : 'ไทยพาณิชย์',
    'bank_account_2' : '038-443-003-2',
    'bank_color_code_2' : '#4e2e7f',
    // 'bank_name_1' : 'กรุงศรี',
    // 'bank_account_1' : '694-112-441-1',
    // 'bank_color_code_1' : '#D4A017',
    // 'bank_name_2' : 'กรุงเทพ',
    // 'bank_account_2' : '648-025-052-8',
    // 'bank_color_code_2' : '#1e4598'
}

var logTo = {
  'invoice_url' : 'https://script.google.com/macros/s/AKfycbxpuJfMPoz1iujA4Zo_ywV57X9TrLxLE2EJ8QvICGxXDtDLUyRh/exec'
}
 

    // ปรับ format วันที่ สำหรับใส่นำหน้าเลข invoice
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join("");
    }


    // ใส่ , ให้ตัวเลข  
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    // แสดงวันที่ ภาษาไทย
    function getDateTH(xDate) {
    var arr_dateTemp = xDate.split("-");
    var strMonthCut = ["", "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
    var dateTH = arr_dateTemp[0] + " " + strMonthCut[parseInt(arr_dateTemp[1])] + " " + (parseInt(arr_dateTemp[2])+543) ;
    return dateTH;
    }

    // คำนวณวันมัดจำให้ลูกค้า
    function getDepositDate(date2) {
      dt1 = new Date(); // เทียบกับวันปัจจุบัน
      dt2 = new Date(date2.split("-").reverse().join("-")); //เปลี่ยนค่าที่รับมาจาก liff (รูปแบบ d-m-y) แปลงไปเป็น YYYY-MM-DD (ISO standard) ก่อนการคำนวณ
      var datediff = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
      
      // เช็คอีกครั้งว่า วันที่จองมา มีอยู่จริงในปฏิทินหรือไม่ (เช่น 31-09-2020)
      if (isNaN(datediff)) {
        alert("รูปแบบวันที่ไม่ถูกต้อง กรุณาระบุอีกครั้งนะคะ");
        return false;
      }
      // ยึดจากวันที่จอง(วันนี้)
      // ถ้าจองเดินทาง วันนี้, พรุ่งนี้, หรือ ไม่เกิน 7 วันล่วงหน้า ให้มัดจำวันนี้
      if (datediff <= 7) {
        // บวกวันไปล่วงหน้า 0 วัน
        dt1.setDate(dt1.getDate() + 0);
        return dt1.getDate() + "-" + (dt1.getMonth()+1) + "-" + dt1.getFullYear();
      } 
      // ถ้าจองเดินทางสัปดาห์หน้า (มากกว่า 7 - 15 วัน) มีเวลาให้มัดจำภายใน 3 วัน
      if (7< datediff && datediff <=15 ) {
        // บวกวันไปล่วงหน้า 3 วัน
        dt1.setDate(dt1.getDate() + 3);
        return dt1.getDate() + "-" + (dt1.getMonth()+1) + "-" + dt1.getFullYear();
      }
      // ถ้าจองเดินทางล่วงหน้ามากกว่า 15 วัน มีเวลาให้มัดจำภายใน 7 วัน
      if (datediff > 15 ) {
        // บวกวันไปล่วงหน้า 7 วัน
        dt1.setDate(dt1.getDate() + 7);
        return dt1.getDate() + "-" + (dt1.getMonth()+1) + "-" + dt1.getFullYear();
      }
    } 

    // ส่ง param ไปเก็บที่ sheet inv
    function sendHttpGet(theUrl)
    {
          var xmlHttp = new XMLHttpRequest();
          xmlHttp.onreadystatechange = function() { 
              if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                  console.log("Insert status : " + xmlHttp.responseText)
          }
          xmlHttp.open("GET", theUrl, true); // true for asynchronous 
          xmlHttp.send(null);
    }
    
