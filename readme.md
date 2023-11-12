# Restaurant API

## Endpoints

### Restaurants

```
GET /restaurant?page={pageNumber}&items={itemsPerPage}
```

Returns Array of objects:

- **id** : _string_ - Restaurant UUID
- **name** : _string_ - Restaurant Name
- **description** : _string_ | _undefined_ - Restaurant Description
- **address** : _string_ - Restaurant Address
- **image** : _string_ - Restaurant Image Path
- **openHours** : _JSON_ - Object type OpenHours contains `{ weekday: from: string, to: string }`
- **rating** : _number_ - Restaurant rate

Gets 2 params in search query:

- **page** - current page number to get
- **items** - numbers of items per page

---

```
GET /restaurant/count
```

Returns number of records in restaurant DB

---

```
GET /restaurant/map
```

Returns Array of objects:

- **id** : _string_ - Restaurant UUID
- **lat**: _number_ - Latitude
- **lon**: _number_ - Longtitude
- **name**: _string_ - Restaurant Name
- **image**: _string_ - Restaurant Image Path

---

```
GET /restaurant/${id}
```

Returns data of single restaurant:

- **id** : _string_ - Restaurant UUID
- **name** : _string_ - Restaurant Name
- **description** : _string_ | _undefined_ - Restaurant Description
- **address** : _string_ - Restaurant Address
- **image** : _string_ - Restaurant Image Path
- **openHours** : _JSON_ - Object type OpenHours contains `{ weekday: from: string, to: string }`
- **rating** : _number_ - Restaurant rate

---

```
POST /restaurant/
```

Add new restaurant to database, takes parameters:

- **name** : _string_ - Restaurant Name
- **description** : _string_ | _undefined_ - Restaurant Description
- **address** : _string_ - Restaurant Address
- **image** : _string_ - Restaurant Image Path
- **openHours** : _JSON_ - Object type OpenHours contains `{ weekday: from: string, to: string }`
- **lat**: _number_ - Latitude
- **lon**: _number_ - Longtitude

### Products

```
GET /products/${id}
```

Returns Array of products for restaurant with id = ${id}:

- **id** : _string_ - Product UUID
- **name** : _string_ - Product Name
- **price** : _number_ - Product Price
- **currency** : _string_ - Price currency
- **imagePath** : _string_ - Image path

Gets one parameter in address:

- **id** : _string_ - Restaurant ID

---

```
POST /products/
```

Add new product to databese, takes parameters:

- **name** : _string_ - Product Name
- **price** : _number_ - Product Price
- **currency** : _string_ - Price currency
- **imagePath** : _string_ - Image path
- **restaurantId** : _string_ - Restaurant id which product belongs to.
