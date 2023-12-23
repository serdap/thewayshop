function discountCode(coupon,subtotal)
{ 
    // mã giảm giá
    var free = ['free123','free456','free789'];
    var percent10 = ['ten1','ten2','ten3'];
    
    //dollar-value codes
    var vietnam10 = ['vncode3', 'vncode4'];

    //đặt giá trị mặc định không giảm giá
    var amount = subtotal;
  	var coupon = coupon;
    var percentDiscount = 1;
    var vnDiscount = 0;
    
    //Điều chỉnh biến % giảm giá nếu mã giảm giá nhập đúng
    if(free.includes(coupon)){percentDiscount=0}
        else{
          if(percent10.includes(coupon)){ 
            percentDiscount=.9
             }
        }
        if(vn84.includes(coupon)){vnDiscount=25}   
    var totalAmount = amount*percentDiscount-vnDiscount;

    //tổng không âm
    if(totalAmount < 0){totalAmount = 0};
  
    return totalAmount;
};



