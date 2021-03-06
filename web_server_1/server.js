'use strict'

//without express, using http built in module
// let http = require('http')

// http.createServer(function(req,res){
//     res.writeHead(200,{'Content-Type': 'text/html'})
//     res.write('<h1>Hello world</h1>')
//     res.end()
// }).listen(8000)
//console.log('server listening on port 8000')

const express = require('express')
let app = express()
const path = require('path') //use the path module

// use CORS to allow AJAX requests from other web sites
const cors = require('cors')
app.use(cors())



//serve static pages in /public_html directly, no processing required
app.use(express.static('public_html'))

//use ejs template engine
//after doing npm install ejs
app.set('view engine', 'ejs')

//home page
app.get('/', function(req, res){
    res.send("<h1>Hello World (from express)</h1>")
})

//define new route localhost:8000/byebye
app.get('/byebye', function(req,res){
    res.send("<h3>bye bye world</h3>")
})

//define new route localhost:8000/chair
app.get('/chair', function(req,res){
    //dirname is a superglobal with current working directory
    let filename = path.join(__dirname,'public_html','chair_response.html')
    res.sendFile(filename)
}
)


/* POST form processing **********************************************************/
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded())

// Parse JSON bodies (as sent by API clients)
app.use(express.json())

// see /public_html/form_post.html
// display form with http://localhost:8000/form_post.html
app.post('/form_validate',
    function (request, response) {
        // get the form inputs from the body of the HTTP request
        console.log(request.body)
        const username = request.body.username
        const password = request.body.password
        console.log('username=' + username + ' password=' + password)
        // process form, validate data …
        if (username === '' || password === '') {
            response.writeHead(400, { 'Content-Type': 'text/html' })
            response.end('missing username or password')
        } else {
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.end('Thanks for submitting the form')
        }
    }
)


//get params
app.get('/test-param/:a/:b',function(req, res){
    console.log(req.params.a)
    console.log(req.params.b)
    res.send('parameter received, see console')
}
)


//display list of products - ejs template
app.get('/products', function (req, res) {
    const pageData = {} // initialize empty object
    pageData.title = 'Product Catalog-blabla.com'
    pageData.description = 'Huge selection of products for all your needs'
    pageData.author = 'The blabla.com team'

    const products = [
        { id: 1, name: 'white shoes', price: '99.99' },
        { id: 2, name: 'black shoes', price: '69.99' },
        { id: 3, name: 'blue shoes', price: '79.99' }
    ]
    pageData.content = '<table>'
    for (let i = 0; i < products.length; i++) {
        pageData.content += '<tr><td>' + products[i].id + '</td>'
        pageData.content += '<td>' + products[i].name + '</td>'
        pageData.content += '<td>' + products[i].price + '</td>'
        pageData.content += '</tr>'
    }
    pageData.content += '</table>'
    res.render('master_template', pageData)
})


//exercise seasons

app.get('/seasons',function (req, res) {
    const pageData2 = {} // initialize empty object
    pageData2.title = 'Product Catalog-blabla.com'
    pageData2.description = 'Huge selection of products for all your needs'
    pageData2.author = 'The blabla.com team'
    const products = [

        "Winter","Summer","Fall","Spring"
    ]
    pageData2.content = '<table>'
    for (let i = 0; i < products.length; i++) {
        pageData2.content += '<tr><td>' + products[i] + '</td>'
        pageData2.content += '</tr>'
    }
    pageData2.content += '</table>'
    res.render('master_template', pageData2)
}

)

const DB = require('./src/dao.js')
//display list of customers
app.get('/orders',
    function(req,res){
        DB.connect()
        DB.query('SELECT * FROM orders',
            function(result){
                let html = ''
                html += 'Number of Orders: ' + result.rowCount + '<br>'
                html += '<table>'
                for (let i = 0; i < result.rowCount; i++) {
                    html += '<tr><td>' + result.rows[i].ordernumber + '</td>'
                    html += '<td>' + result.rows[i].orderdate + '</td>'
                    html += '<td>' + result.rows[i].requireddate + '</td>'
                    html += '<td>' + result.rows[i].shippeddate + '</td>'
                    html += '<td>' + result.rows[i].comments + '</td>'
                    html += '<td>' + result.rows[i].status + '</td>'
                    html += '<td>' + result.rows[i].customernumber + '</td></tr>'
                }
                html += '</table>'

                // use the page template of course to display the list
                const pageData = {} // initialize empty object
                pageData.title = 'Order from classicmodels DB'
                pageData.description = 'Order Details'
                pageData.author = 'Rohith'
                // send out the html table
                pageData.content = html
                res.render('master_template', pageData)
                DB.disconnect()

            }
        )

    }
)



//customer search form
app.get('/customer_search_form', function(req,res){
    //dirname is a superglobal with current working directory
    let filename = path.join(__dirname,'public_html','customer_search_form.html')
    res.sendFile(filename)
}
)
//Customer validate and display
app.post('/customer_search_id',
    function (request, response) {
        // get the form inputs from the body of the HTTP request
        console.log(request.body)
        const customerId = request.body.id
        console.log('username=' + customerId)
        // process form, validate data …
        if (customerId === '' || customerId > 1000000) {
            response.writeHead(400, { 'Content-Type': 'text/html' })
            response.end('please enter valid customer id')
        } else {
            DB.connect()
            DB.queryParams('select * from customers where customernumber = $1',[customerId],
            function(result){
                if(result.rowCount === 0){
                    response.writeHead(400, { 'Content-Type': 'text/html' })
                    response.end('customer not found')
                }else{

                    let html = ''
                html += '<table>'
                for (let i = 0; i < result.rowCount; i++) {
                    html += '<tr><td>' + result.rows[i].customernumber + '</td>'
                    html += '<td>' + result.rows[i].customername + '</td>'
                    html += '<td>' + result.rows[i].contactlastname + '</td>'
                    html += '<td>' + result.rows[i].contactfirstname + '</td>'
                    html += '<td>' + result.rows[i].phone + '</td>'
                    html += '<td>' + result.rows[i].addressline1 + '</td>'
                    html += '<td>' + result.rows[i].addressline2 + '</td>'
                    html += '<td>' + result.rows[i].city + '</td>'
                    html += '<td>' + result.rows[i].state + '</td>'
                    html += '<td>' + result.rows[i].postalcode + '</td>'
                    html += '<td>' + result.rows[i].country + '</td>'
                    html += '<td>' + result.rows[i].salesrepemployeenumber + '</td>'
                    html += '<td>' + result.rows[i].creditlimit + '</td></tr>'
                }
                html += '</table>'

                // use the page template of course to display the list
                const pageData = {} // initialize empty object
                pageData.title = 'Customer info'
                pageData.description = 'Customer Details'
                pageData.author = 'Rohith'
                // send out the html table
                pageData.content = html
                response.render('master_template', pageData)
                DB.disconnect()

                }
            }
            )
        }
    }
)


// for AJAX tests, returns the list of customers in a JSON string
app.get('/customers', function (request, response) {
    let DB = require('./src/dao');
    DB.connect();
    DB.query('SELECT * from customers',function (customers){
        const customersJSON={customers:customers.rows}
        const customersJSONString = JSON.stringify(customersJSON, null, 4)
        // set content type
        response.writeHead(200, { 'Content-Type': 'application/json'})
       // send out a string
        response.end(customersJSONString)
    })
});
app.get('/employees', function (request, response) {
    let DB = require('./src/dao');
    DB.connect();
    DB.query('SELECT * FROM employees',function (employees){
        const employeesJSON={employees:employees.rows}
        const employeesJSONString = JSON.stringify(employeesJSON, null, 4)
        // set content type
        response.writeHead(200, { 'Content-Type': 'application/json'})
       // send out a string
        response.end(employeesJSONString)
    })
});

// delete one customer
// note you cannot delete customers with orders
// to know customers that don't have an order run this query
// SELECT * from customers
// LEFT JOIN orders on customers.customernumber = orders.customernumber
// WHERE ordernumber IS NULL
// ORDER BY customers.customernumber ASC
// result: you can delete customernumber 477,480,481 and others
app.delete('/customers/:id', function (request, response) {
    let id=request.params.id // read the :id value send in the URL
    let DB = require('./src/dao');
    DB.connect();
    DB.queryParams('DELETE from customers WHERE customernumber=$1',[id],function (customers){
        response.writeHead(200, { 'Content-Type': 'text/html'})
       // send out a string
        response.end("OK customer deleted")
    })
});



//start server
app.listen(8000, function(){
    console.log('Server listening to port 8000 using express')
})

