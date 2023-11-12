# Restaurant API
## Endpoints
### Restaurants
``````
GET /restaurants?page={pageNumber}&items={itemsPerPage}
``````
Returns Array of objects: 
* __id__ : _string_ - Restaurant UUID
* __name__ : _string_ - Restaurant Name
* __description__ : _string_ | _undefined_ - Restaurant Description
* __address__ : _string_ - Restaurant Address
* __image__ : _string_ - Restaurant Image Path
* __openHours__ : _JSON_ - Object type OpenHours contains `{ weekday: from: string, to: string }`
* __rating__ : _number_ - Restaurant rate

Gets 2 params in search query:
* __page__ - current page number to get
* __items__ - numbers of items per page

___
``````
GET /restaurants/count
``````
Returns number of records in restaurant DB

___
``````
GET /restaurants/map
``````
Returns Array of objects:
* __id__ : _string_ - Restaurant UUID
* __lat__: _number_ - Latitude
* __lon__: _number_ - Longtitude
* __name__: _string_ - Restaurant Name
* __image__: _string_ - Restaurant Image Path
___
``````
GET /restaurant/${id}
``````
Returns data of single restaurant:
* __id__ : _string_ - Restaurant UUID
* __name__ : _string_ - Restaurant Name
* __description__ : _string_ | _undefined_ - Restaurant Description
* __address__ : _string_ - Restaurant Address
* __image__ : _string_ - Restaurant Image Path
* __openHours__ : _JSON_ - Object type OpenHours contains `{ weekday: from: string, to: string }`
* __rating__ : _number_ - Restaurant rate
___
``````
POST /restaurant/
``````
Add new restaurant to database, takes parameters:
* __name__ : _string_ - Restaurant Name
* __description__ : _string_ | _undefined_ - Restaurant Description
* __address__ : _string_ - Restaurant Address
* __image__ : _string_ - Restaurant Image Path
* __openHours__ : _JSON_ - Object type OpenHours contains `{ weekday: from: string, to: string }`
* __lat__: _number_ - Latitude
* __lon__: _number_ - Longtitude

### Products
``````
GET /products/${id}
``````
Returns Array of products for restaurant with id = ${id}:
* __id__ : _string_ - Product UUID
* __name__ : _string_ - Product Name
* __price__ : _number_ - Product Price
* __currency__ : _string_ - Price currency
* __imagePath__ : _string_ - Image path

Gets one parameter in address:
* __id__ : _string_ - Restaurant ID
___
``````
POST /products/
``````
Add new product to databese, takes parameters:
* __name__ : _string_ - Product Name
* __price__ : _number_ - Product Price
* __currency__ : _string_ - Price currency
* __imagePath__ : _string_ - Image path
* __restaurantId__ : _string_ - Restaurant id which product belongs to.
