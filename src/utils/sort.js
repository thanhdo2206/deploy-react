export const mapOrder = (array,order,key)=>{
    // console.log(order);
   
    array.sort(
        (a, b) =>
            order.indexOf(a[key]) - order.indexOf(b[key])
    );
    return array;
}