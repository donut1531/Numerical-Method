
var interpolationQuadratic_Poly_linear = require('interpolating-polynomial')
const Spline = require('cubic-spline');
const math = require('mathjs');
function checkEquation (equation){
    equation = equation.replaceAll('X','x')

    return equation
}
export function parseInt2D (n,matrix){
    let arr = []
    for(let i = 0;i < n ; i++){
        arr.push([])
       for(let j = 0 ; j < n ; j++){
           arr[i][j]  = (parseInt(matrix[i][j]))
       }
    }
    return arr;
}
export function parseInt1D (n,matrix){
    let arr = []
    for(let i = 0;i < n ; i++){
       
           arr[i] =parseInt(matrix[i])
       
    }
    return arr;
}
export function parseFloat2D (n,matrix){
    let arr = []
    for(let i = 0;i < n ; i++){
        arr.push([])
       for(let j = 0 ; j < n ; j++){
           arr[i][j]  = (parseFloat(matrix[i][j]))
       }
    }
    return arr;
}

export function copyArray(n,matrix){

    let arr = []
    for(let i = 0;i < n ; i++){
        arr.push([])
        arr[i] = [...matrix[i]]
    }
    return arr;
}

export function calBisection  (initialEquation ,initialXL,initialXR,initialError) {

    let equation = checkEquation(initialEquation)
    
    equation = math.parse(equation).compile()

    let xl = math.bignumber(initialXL)

    let xr = math.bignumber(initialXR)

    let error = math.bignumber(initialError)
    
   


    let arr = []


    let xm = math.divide(math.add(xl,xr),2)

    let fx = math.multiply(equation.evaluate({x :xm}),equation.evaluate({x :xr}))

    if(fx < 0){
        xl = xm;
    }
    else{
        xr = xm;
    }

    let checkError = 9999;

    let oldXm = xm;

    let i = 0;
    while(checkError > error){

        xm = math.divide(math.add(xl,xr),2)

        fx = math.multiply(equation.evaluate({x :xm}),equation.evaluate({x :xr}))

        if(fx < 0){
            xl = xm;
        }
        else{
            xr = xm;
        }
        checkError = Math.abs((xm-oldXm)/xm);

        oldXm = xm;

      
        arr.push(<div style = {{fontSize : '25px' , display : 'flex' }}>
        <span style = {{ width : '40%' , textAlign : 'left'}}> Iteration {i} : x is {xm.toFixed(9)}</span>
        <span > Error : {checkError.toFixed(9)}</span>
        </div>);
        i++;
        
       
    
    }
    arr.push(<div style = {{fontSize:'40px' , fontWeight : 'bold',textAlign : 'left'}}> Result of x is {xm.toFixed(9)}</div>);
            
    return arr;
}

export function calFalse(initialEquation ,initialXL,initialXR,initialError){

    let equation = checkEquation(initialEquation)

     equation = math.parse(equation).compile()

     let xl = math.bignumber(initialXL)
     let xr = math.bignumber(initialXR)
     let error = math.bignumber(initialError)
     
     let arr = []

     let i = 1;
     
     let x1 = 0;
     let oldX1 = 0;

     let checkError = 9999

     while(checkError > error){

        // console.log('first  '+i)
        let fXL  = equation.evaluate({x : xl})

        let fXR  = equation.evaluate({x : xr})
        
         x1 = math.divide(math.subtract(math.multiply(xl , fXR) , math.multiply(xr , fXL)) , math.subtract(fXR , fXL))

        
        // console.log('middle   ' + i)
        let fx1 = equation.evaluate({x : x1})

        let check = math.multiply(fx1,fXR)
       
        if( check >= 0){
            xr = x1
        }
        else{
            xl =x1
        }

        checkError =  math.abs((x1 - oldX1)/x1);

        oldX1 = x1

        arr.push(<div style = {{fontSize : '25px' ,display : 'flex'}}>
        <span style = {{width : '40%' , textAlign : 'left'}}> Iteration {i} : X is {x1.toFixed(9)} </span>
        <span > Error : {checkError.toFixed(9)} </span>

        </div>)
        
        i++
        
     }
     arr.push(<div style = {{fontSize:'40px' , fontWeight : 'bold',textAlign : 'left'}}>RESULT OF X IS {x1.toFixed(9)} </div>)
       
     return arr
}

export function calOnepoint(initialEquation ,initialX,initialError){

    let equation = checkEquation(initialEquation)

     equation = math.parse(equation).compile()
     
     let X = math.bignumber(initialX)
    
     let error = math.bignumber(initialError)
     
     let arr = []

     let i = 1;
     
     
     let oldX = 0;

     let checkError = 9999
     let oldcheckError = 9999;
     while(checkError > error){

        
         X  = equation.evaluate({x : X})

         checkError =  math.abs((X - oldX)/X);
          if(checkError >= oldcheckError && i > 3){
              arr = []
           arr.push({key : i , iteration : "ลู่ออก" ,x : "ลู่ออก" ,error : "ลู่ออก"})
             break;
         }
          oldcheckError = checkError;
        
         oldX = X
         
       
       
        console.log(X.toFixed(9))
        arr.push(<div style = {{fontSize : '25px' , display : 'flex' }}>
        <span style = {{ width : '40%' , textAlign : 'left'}}> Iteration {i} : x is {X.toFixed(9)}</span>
        <span > Error : {checkError.toFixed(9)}</span>
        </div>);
        
        i++;
     }
      arr.push(<div style = {{fontSize:'40px' , fontWeight : 'bold',textAlign : 'left'}}> Result of x is {X.toFixed(9)}</div>);
     return arr
}


export function calNewton(initialEquation, initialX, initialError) {

    let equation = checkEquation(initialEquation)

    equation = math.parse(equation)
    let X = math.bignumber(initialX)

    let fXprime = math.derivative(equation,'x')
    let arr = []
    
    let error = math.bignumber(initialError)
    arr.push(<div style = {{textAlign : 'left' , fontSize : '25px'}}><span> f'(x) = {fXprime.toString()}</span></div>)
    fXprime = fXprime.compile()

   

    let i = 1;


    let oldX = X;

    let checkError = 9999 
    let oldcheckError = 9999;
   
    while (checkError > error) {

        let fXdiff = fXprime.evaluate({x : X})
        let fX = equation.evaluate({ x: X })
        X = math.subtract(X, math.divide(fX, fXdiff))



        checkError = math.abs((X - oldX) / X);
        if (checkError > oldcheckError) {
            arr.push({ key: i, iteration: "ลู่ออก", x: "ลู่ออก", error: "ลู่ออก" })
            break;
        }
        oldcheckError = checkError;

        oldX = X


        
       

        arr.push(<div style = {{fontSize : '25px' , display : 'flex' }}>
               <span style = {{ width : '60%' , textAlign : 'left'}}> Iteration {i} : x is {X.toFixed(9).toString()}</span>
               <span > Error : {checkError.toFixed(9).toString()}</span>
               </div>);
               console.log(i);
               i++;

    }
    arr.push(<div style = {{fontSize:'40px' , fontWeight : 'bold',textAlign : 'left'}}> Result of x is {X.toFixed(9).toString()}</div>);
   
    return arr
}
export function calSecant(initialEquation, initialX0,initialX1, initialError) {
    
    let equation = checkEquation(initialEquation)
    console.log('aaa')
    equation = math.parse(equation).compile()
    
    let x0 = math.bignumber(initialX0)
    let x1 = math.bignumber(initialX1)


   let fx0 = equation.evaluate({x:x0})
   let fx1 = equation.evaluate({x:x1})
    
    console.log('bbb')
    let error = math.bignumber(initialError)

    

    let arr = []

    let i = 1;

    let x = 0;
    let oldX = 0;

    let checkError = 9999
   
    while (checkError > error) {

       x = math.subtract(x1 , math.divide(math.multiply(fx1,math.subtract(x0 , x1) ), math.subtract(fx0 , fx1)));
       console.log(x.toString())     
            checkError = Math.abs((x - x1)/x);
            
            fx0 = fx1;
            x0 = x1;
            x1 = x;
            fx1 = equation.evaluate({x : x1})


       
         oldX = checkError;

       
      

        arr.push(<div style = {{fontSize : '25px' , display : 'flex' }}>
            <span style = {{ width : '60%' , textAlign : 'left'}}> Iteration {i} : x is {x.toFixed(9).toString()}</span>
            <span > Error : {checkError.toFixed(9).toString()}</span>
            </div>);
            
            i++;

    }
    
    arr.push(<div style = {{fontSize:'40px' , fontWeight : 'bold',textAlign : 'left'}}> Result of x is {x.toFixed(9).toString()}</div>);
    
    return arr
}

export function calCramer(n, initialMatrix1, initialMatrix2) {

     
   
    let matrix1=math.bignumber(initialMatrix1)
    
    let matrix2=math.bignumber(initialMatrix2)
    let det_matrixA = math.det(matrix1)
    
    let temp_matrix1 = copyArray(n,matrix1)
    console.log(matrix1)
    console.log(matrix2)
    let arr = []

    let X = [];
    
    


        for (let i = 0; i < n; i++) { 

            for (let j = 0; j < n; j++) { 
                temp_matrix1[j][i] = matrix2[j]  
            }
            X[i] = math.divide(math.det(temp_matrix1) , det_matrixA)
            console.log(X[i].toString())
            arr.push(<div> X{(i+1)} is {X[i].toFixed(9).toString()} </div> )
            
            temp_matrix1 = copyArray(n,matrix1);
        }

      
        
    return arr
}



export function calElimination(n, initialMatrix1, initialMatrix2) {

    initialMatrix1 = parseInt2D(n,initialMatrix1)
    initialMatrix2 = parseInt1D(n,initialMatrix2)
    let matrix1=copyArray(n,initialMatrix1)
    let matrix2=copyArray(n,initialMatrix2)

    
    
    let arr = []
    let X = []
    
    for(let i = 0 ; i < n ; i++){
        matrix1[i].push(matrix2[i]) 
        X.push(1)
    }
    
   console.log(matrix1,toString())
    for(let i = 1;i < n ; i++){
        for(let j = i ;j < n ; j++){

            let divide = matrix1[i-1][i-1]
            let multi = matrix1[j][i-1]

            for(let k = i-1 ; k < n+1;k++){
                matrix1[j][k] = matrix1[j][k] - ((matrix1[i-1][k]/divide)*multi)
                
            }
    
        }
         
    }

   for(let i = n-1 ;i >= 0 ; i--){
        let sum = 0;
        for(let j = 0 ; j < n ;j++){
            sum = sum + matrix1[i][j]*X[j];
        }
        sum = sum - matrix1[i][i]
    X[i] = ((matrix1[i][n] - sum)/matrix1[i][i])
       
    }
    X.map((x,i) => arr.push(<div> X{(i+1)} is {x.toFixed(9).toString()} </div>))
    
        
    return arr
}


export function calJordan(n, initialMatrix1, initialMatrix2) {

    initialMatrix1 = parseInt2D(n,initialMatrix1)
    initialMatrix2 = parseInt1D(n,initialMatrix2)
    let matrix1=copyArray(n,initialMatrix1)  
    let matrix2=copyArray(n,initialMatrix2) 
    
    
    
    let arr = []
    let X = []
    
    for(let i = 0 ; i < n ; i++){
        matrix1[i].push(matrix2[i]) 
        X.push(1)
    }
    console.log(matrix1)
   
    for(let i = 1;i < n ; i++){
        for(let j = i ;j < n ; j++){

            let divide = matrix1[i-1][i-1]
            let multi = matrix1[j][i-1]

            for(let k = i-1 ; k < n+1;k++){
                matrix1[j][k] = matrix1[j][k] - ((matrix1[i-1][k]/divide)*multi)
              
            }
    
        }
         
    }
    for(let i = n-2;i >= 0 ; i--){
        for(let j = i ;j >= 0 ; j--){

            let divide = matrix1[i+1][i+1]
            let multi = matrix1[j][i+1]

            for(let k = n ; k >= i;k--){
                matrix1[j][k] = matrix1[j][k] - ((matrix1[i+1][k]/divide)*multi)
              
            }
    
        }
         
    }

    for(let i = 0 ;i < n ; i++){
        X[i] = ((matrix1[i][n] )/matrix1[i][i])
    }
       
      
        
    
    X.map((x,i) => arr.push(<div> X{(i+1)} is {x.toFixed(9).toString()} </div>))

        
    return arr
}

export function calLu(n, initialMatrix1, initialMatrix2) {

    initialMatrix1 = parseInt2D(n,initialMatrix1)
    initialMatrix2 = parseInt1D(n,initialMatrix2)
    let A = copyArray(n,initialMatrix1) 
    let B = copyArray(n,initialMatrix2) 

   
   
    let arr = []
    let U = []
    let L = []
    let Y = []
    let X = []
    
    for (let i = 0; i < n; i++) {
            U.push([])
            L.push([])
            Y.push(1)
            X.push(1)
        for (let j = 0; j < n; j++) {
            L[i][j]=0
            if(i == j){
                U[i][j]= 1
            }
            else{
                
                U[i][j]=0
            }
               
               
           
           
            

        }
    }
   
    for (let i = 0; i < n; i++) {

        for (let j = 0; j < n; j++) {

            let sum = 0

            for (let k = 0; k < n; k++) {


                if (k != j || i < j) {
                    sum += L[i][k] * U[k][j]
                }


            }
            if (i >= j) {
                sum = A[i][j] - sum;
                L[i][j] = sum;
            }
            else {
                sum = A[i][j] - sum;
                U[i][j] = sum / L[i][i];
            }
        }
    }
   
    
    for (let i = 0; i < n; i++) {
        let sum = 0;
        for (let j = 0; j < n; j++) {

            sum += L[i][j] * Y[j];
        }
        sum = sum - L[i][i] * Y[i];

        Y[i] = ((B[i] - sum) / L[i][i])
        
    }
    for (let i = n-1; i >= 0; i--) {
        let sum = 0;
        for (let j = 0; j < n; j++) {

            sum += U[i][j] * X[j];
        }
        sum = sum - U[i][i] * X[i];

        X[i] = ((Y[i] - sum) / U[i][i])

    }
    
  
    X.map((x, i) => arr.push(<div> X{(i+1)} is {x.toFixed(9).toString()} </div>))








    return arr
}

export function calJacobi(n, initialMatrix1, initialMatrix2,initialError) {

    let check = true;
    initialMatrix1 = parseInt2D(n,initialMatrix1)
    initialMatrix2 = parseInt1D(n,initialMatrix2)
    let matrix1=copyArray(n,initialMatrix1)
    let matrix2=copyArray(n,initialMatrix2)
    
    let error = initialError

  
    
    let arr = []
    
    let resultX = []
    let ansX = []
    
    let arr_Error = []
    for(let i = 0 ; i < n ;i++){
        resultX.push(0)
        
    }
    
    while(check){

       
        
        
        for(let i = 0;i <  n ;i++){
            let sum = matrix2[i]
            for(let j = 0;j < n;j++){
                if(i != j){
                    
                   
                    sum = (sum- (matrix1[i][j]*resultX[j]))
                    
                    
                    
                }
                
            }
            
            
            ansX[i] = sum/matrix1[i][i];
            
            
          
            arr_Error[i] = math.abs((ansX[i]-resultX[i])/ansX[i])
            
            console.log(arr_Error[i])
            
           
        }
        resultX = [...ansX]
        check = false
        for(let i = 0 ; i < n ; i++){
            if(arr_Error[i] > error){
               check = true
               break;
            }
          
            
        }
       
    
    }
    for(let i = 0 ; i < n ; i++){
        arr.push(<div> X{(i+1)} is {resultX[i].toFixed(9).toString()} </div>)
    }
     

        
    return arr
}

export function calSeidel(n, initialMatrix1, initialMatrix2,initialError) {

    let check = true;
    initialMatrix1 = parseInt2D(n,initialMatrix1)
    initialMatrix2 = parseInt1D(n,initialMatrix2)
    let matrix1=copyArray(n,initialMatrix1)
    let matrix2=copyArray(n,initialMatrix2)
    
    let error = initialError

  
    
    let arr = []
    
    let resultX = []
    let ansX = []
    
    let arr_Error = []
    for(let i = 0 ; i < n ;i++){
        resultX.push(0)
        
    }
    
    while(check){

       
        
        
        for(let i = 0;i <  n ;i++){
            let sum = matrix2[i]
            for(let j = 0;j < n;j++){
                if(i != j){
                    
                   
                    sum = (sum- (matrix1[i][j]*resultX[j]))
                    
                    
                    
                }
                
            }
            
            
            ansX[i] = sum/matrix1[i][i];
            
            
          
            arr_Error[i] = math.abs((ansX[i]-resultX[i])/ansX[i])
            resultX[i] = ansX[i]
            console.log(arr_Error[i])
            
           
        }
        resultX = [...ansX]
        check = false
        for(let i = 0 ; i < n ; i++){
            if(arr_Error[i] > error){
               check = true
               break;
            }
          
            
        }
       
    
    }
    for(let i = 0 ; i < n ; i++){
        arr.push(<div> X{(i+1)} is {resultX[i].toFixed(9).toString()} </div>)
    }
     

        
    return arr
}


export function calConjugate(n, initialMatrix1, initialMatrix2,initialError) {

    initialMatrix1 = parseInt2D(n,initialMatrix1)
    initialMatrix2 = parseInt1D(n,initialMatrix2)
    let A = copyArray(n,initialMatrix1)

    let B = [...initialMatrix2]
    
    let error = initialError

  
    
    let arr = []
    
    let X = []
    
    let K = 0;
    
    

    for(let i = 0 ; i < n ;i++){
       X.push(0)
        
    }
    
    let R = math.multiply(A,X);
    R = math.subtract(R,B);
    let D = math.multiply(R,-1);
    
    let lambda = null;

    let alpha = null; 
    let checkError = 9999
    while(checkError > error){

        lambda = math.transpose(D);
        let temp = lambda;
        lambda = math.multiply(lambda, R);
        temp = math.multiply(temp, A);
        temp = math.multiply(temp, D);

        lambda = lambda / temp;

        lambda = math.multiply(lambda, -1);

        temp = math.multiply(lambda, D);
        X = math.add(X, temp);

        temp = math.multiply(A, X);
        R = math.subtract(temp, B);

        temp = math.transpose(R);
        temp = math.multiply(temp, R);

        checkError = math.sqrt(temp);

        alpha = math.transpose(R);
        alpha = math.multiply(alpha, A);
        alpha = math.multiply(alpha, D);

        temp = math.transpose(D);
        temp = math.multiply(temp, A);
        temp = math.multiply(temp, D);

        alpha = alpha / temp;

        temp = math.multiply(alpha, D);
        D = math.multiply(R, -1);
        D = math.add(D, temp);

       K++;
         
        
        
        
   

        
   
}
   
for(let i = 0 ; i < n ; i++){
    arr.push(<div> X{(i+1)} is {X[i].toFixed(9).toString()} </div>)
}
 
return arr
}

export function calNewtonInterpolation( initialMatrix1, initialPoint,initialX) {

    

    let A = initialMatrix1

    let P = [...initialPoint]
   
    let X = initialX

    
    
    let arr = []
    let ans = []

   
   for(let i = 0 ; i < P.length ; i++){
           arr.push(A[parseFloat(P[i])-1])
   }
  
   console.log(arr.toString())
   let findX = interpolationQuadratic_Poly_linear(arr)

   

   ans.push(<div> f({X})  =  {findX(X).toFixed(7)} </div>)
   
   return ans
}

export function calLagrange(initialMatrix1,initialPoint,initialX){
    

    let A = initialMatrix1

    let P = initialPoint
   
    let X = initialX

    

    let arr = []
    let ans = []

   
   for(let i = 0 ; i < P.length ; i++){
           arr.push(A[parseInt(P[i])-1])
   }
   console.log(arr)

   //-----------------------------------------------------------//
   let xs = []
   let ys = []

	for(let i = 0 ; i < arr.length ; i++){

		for(let j = 0 ; j < arr.length ; j++){
				if(j == 0){
					xs.push(arr[i][j])
				}
				else if(j == 1){
					ys.push(arr[i][j])
				}
		}
			
	}
    console.log(xs.length)
    console.log(ys.length)
    //--------------------------------------------------------//
    let ws = [];
	let k = xs.length;
	let w;
	
	for (let j = 0; j < k; ++j) {
		w = 1;
		for (var i = 0; i < k; ++i) {
			if (i != j) {
				w *= xs[j] - xs[i];
			}
		}
		ws[j] = 1/w;
	}
 //-----------------------------------------------------------//
    let a = 0;
	let b = 0;
	let c = 0;

	for (let j = 0; j < xs.length; ++j) {
		
		if (X != xs[j]) {
			
			a = ws[j] / (X - xs[j]);
			b += a * ys[j];
			c += a;
		} else {
            ans.push(<div> f({X})   {ys[j]} </div> )
			return ans;
            
			
		}
	}
	


    ans.push(<div>f({X}) = {(b/c).toFixed(7)} </div>)
	

    return ans

}

export function calSpline(initialMatrix1,initialX){
    
    let arr = copyArray(initialMatrix1.length,initialMatrix1)
    
    arr = parseFloat2D(arr.length,arr)

   
    
   
    let X = initialX

    

    
    let ans = []

  

   //-----------------------------------------------------------//
   let xs = []
   let ys = []



	for(let i = 0 ; i < arr.length ; i++){

		for(let j = 0 ; j < arr.length ; j++){
				if(j == 0){
					xs.push(arr[i][j])
				}
				else if(j == 1){
					ys.push(arr[i][j])
				}
		}
			
	}

    const spline = new Spline(xs,ys)
    

    ans.push(<div>f({X}) = {spline.at(X).toFixed(7)} </div>)
   
	

    return ans

}


export function calLinear(initialMatrix1,initialX){
    
    let arr = copyArray(initialMatrix1.length,initialMatrix1)

    arr = parseFloat2D(arr.length,arr)

    let  n = arr.length
  
    // let arr =  [[10, 5],[15, 9],[20, 15],
    //  [30, 18], 
    //  [40, 22],
    //  [50, 30], 
    //  [60, 35],
    //  [70, 38], 
    // [80, 43]]
    let x = []
    let y = []
    for(let i = 0 ; i < n ; i++){
        for(let j = 0 ; j < 2 ; j++){
            if(j == 0){
                x.push(arr[i][j])
            }
            else{
                y.push(arr[i][j])
            }
        }
    }

    console.log(x.toString())
    console.log(y.toString())
    function cal(matrix1){
        let summ = 0
        for(let i = 0 ; i< n ; i++){
             summ += matrix1[i]
        }
        return summ;
    }
    function calmulti(matrix1,matrix2){
        let summ = 0
        for(let i = 0 ; i< n ; i++){
             summ += matrix1[i]*matrix2[i]
        }
        return summ;
    }
    function calpowx(matrix1){
        let summ = 0
        for(let i = 0 ; i< n ; i++){
             summ += matrix1[i]*matrix1[i]
        }
        return summ;
    }

    let sumx = cal(x)
    let sumy = cal(y)
    let sumx2 = calpowx(x)
    

    let sumyx = calmulti(y,x)

    let new_matrix_X = [[n,sumx],[sumx,sumx2]]
    console.log(new_matrix_X)
    let new_matrix_Y = [sumy,sumyx]
    console.log(new_matrix_Y)
    let inverse = math.inv(new_matrix_X)
    let ans_matrix = math.multiply(inverse,new_matrix_Y)
    console.log(ans_matrix)

    let ans = []
    
	ans.push(<div>f({initialX}) = { (ans_matrix[0] + (ans_matrix[1]*initialX)).toFixed(5)} </div>)

    return ans

}


export function calPoly(initialMatrix1,initialX){

    
    let arr = copyArray(initialMatrix1.length,initialMatrix1)

    arr = parseFloat2D(arr.length,arr)
  
     let  n = arr.length
     let x = []
     let y = []
     for(let i = 0 ; i < n ; i++){
         for(let j = 0 ; j < 2 ; j++){
             if(j == 0){
                 x.push(arr[i][j])
             }
             else{
                 y.push(arr[i][j])
             }
         }
     }

     function cal(matrix1){
        let summ = 0
        for(let i = 0 ; i< n ; i++){
             summ += matrix1[i]
        }
        return summ;
    }
    function calmulti(matrix1,matrix2){
        let summ = 0
        for(let i = 0 ; i< n ; i++){
             summ += matrix1[i]*matrix2[i]
        }
        return summ;
    }
 
    function calmulti_yx2(matrix1,matrix2){
        let summ = 0
        for(let i = 0 ; i< n ; i++){
             summ += math.pow(matrix2[i],2)*matrix1[i]
        }
        return summ;
    }
    function calpow(matrix1,N){
        let summ = 0
        for(let i = 0 ; i< n ; i++){
             summ += math.pow(matrix1[i],N)
        }
        return summ;
    }

    let sumx = cal(x)
    let sumy = cal(y)
    ///กำลัง 2,3,4
    let sumx2 = calpow(x,2)
    let sumx3 = calpow(x,3)
    let sumx4 = calpow(x,4)
    // x คูณ y
    let sumyx = calmulti(y,x)
    let sumyx2 = calmulti_yx2(y,x)

    
    let new_matrix_X = [[n,sumx,sumx2],[sumx,sumx2,sumx3],[sumx2,sumx3,sumx4]]
    console.log(new_matrix_X)
    let new_matrix_Y = [sumy,sumyx,sumyx2]
    console.log(new_matrix_Y)

    let inverse = math.inv(new_matrix_X)
    let ans_matrix = math.multiply(inverse,new_matrix_Y)

	let ans = []
    ans.push(<div>f({initialX}) = { ans_matrix[0]+ ans_matrix[1]*initialX + ans_matrix[2]*math.pow(initialX,2)} </div>)
    return ans

}

export function calMultiple(initialN,initialMatrix1,initialX1,initialX2,initialX3){
    
    let n = initialN;
    let X1 = initialX1
    let X2 = initialX2
    let X3 = initialX3
  
    // let A = [[1,0,1,4],[0,1,3,-5],[2,4,1,-6],[3,2,2,0],[4,1,5,-1],[2,3,3,-7],[1,6,4,-20]]
    let A = copyArray(initialMatrix1.length,initialMatrix1)
    // let A = initialMatrix1
    A = parseFloat2D(A.length,A)
      let x1 = []
      let x2 = []
      let x3 = []
      let y = []
      let sumx1 = 0
      let sumx2 = 0
      let sumx3 = 0
      let sumy  = 0
      for(let i = 0; i < n ; i++){
          for(let j = 0 ; j < 4 ; j++){
              if(j == 0){
                x1.push(A[i][j])
                
                 sumx1 +=  A[i][j]
                
              }
              else if(j == 1){
                x2.push(A[i][j])
               
                sumx2 +=  A[i][j]
                
              }
              else if(j == 2){
                x3.push(A[i][j])
                 sumx3 +=  A[i][j]
                
              }
              else if(j == 3){
                y.push(A[i][j])
                 sumy += A[i][j]
               
              }
          }
      }
    
       console.log(x1.toString())
       console.log(x2.toString())
       console.log(x3.toString())
       console.log(y.toString())
       console.log(sumx1)
       console.log(sumx2)
       console.log(sumx3)
       console.log(sumy)
      function cal(matrix1,matrix2){
        let summ = 0
        for(let i = 0 ; i< n ; i++){
             summ += (matrix1[i]*matrix2[i])
        }
        return summ;
      }
    
      let Xx = []
      
      Xx.push(x1)
      Xx.push(x2)
      Xx.push(x3)
      Xx.push(y)
      
      let arrSum = []
      arrSum.push(sumx1)
      arrSum.push(sumx2)
      arrSum.push(sumx3)
      arrSum.push(sumy)
      console.log(arrSum)
    
      // console.log(cal(Xx[0],Xx[2]))
      // console.log(Xx)
    //   console.log(cal(x1,x1))
    //  console.log(cal(x1,x2))
    //  console.log(cal(x1,x3))
    //  console.log(cal(x2,x3))
    //  console.log(cal(x1,y))  
    //  console.log(cal(x2,y))
    //  console.log(cal(x3,y))
      
    let B = []
    
    for (let i = 0; i < 4; i++) {
      B.push([])
      for (let j = 0; j < 4+1; j++) {
        
        if (i == 0 && j == 0) {
          B[i][j] = 7
        }
        else if(i == 0){
          
           
          
            B[i][j] = arrSum[j-1]
          
         
        }
        else if(j == 0){
          B[i][j] = arrSum[i-1]
        }
        else{
          
          
            B[i][j] = cal(Xx[i-1], Xx[j-1])
          
         
          
        }
        
    
    
        }
    
      }
      console.log(B)
      //วน for เพื่อแยก x กับ y ออกจาก B
      let ans_x = []
      let ans_y = []
      for(let i = 0 ; i < B.length ; i++){
          ans_x.push([])
          for(let j = 0 ;j < B.length+1 ; j++){

              if(j == 4){
                  ans_y.push( B[i][j])
              }
              else{
                ans_x[i][j] = B[i][j]
              }
          }
      }
      console.log(ans_x)
      console.log(ans_y)
      //นำ A inverse มาคูณเข้ากับ ans_y เพื่อหาค่า a0,a1,a2,a3
      let inverse = math.inv(ans_x)

      let ans_matrix = math.multiply(inverse,ans_y)
      console.log(ans_matrix)
      //นำค่าใส่สมการ
      let fX = ans_matrix[0] + ans_matrix[1]*X1+ans_matrix[2]*X2+ans_matrix[3]*X3

     let arr = []

     arr.push(<div> Y = { fX.toFixed(7)} </div>)
     return arr


}
