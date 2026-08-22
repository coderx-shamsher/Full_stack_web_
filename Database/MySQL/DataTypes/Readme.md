# Mysql Data Types 
- *MySQL Data Types define the type of data that can be stored in a table column. They help ensure that data is stored in a structured and efficient way.*

- Ensure that only valid and appropriate data is stored in each column.
- Improve storage efficiency and query performance.
- Include categories such as numeric, string, date & time, and spatial data types.

---


## Numeric Data Types
Numeric Data Types in MySQL are used to store numeric values such as integers and decimal numbers. They allow databases to perform mathematical operations and store numbers with different ranges and precision.

---

- INT : *Integer type, used for whole numbers, Used to store whole numbers such as IDs, counts, or quantities*
- TINYINT: Used to store very small integer values, often for flags or status values.
- SMALLINT: Used to store small integer numbers that require less storage.
- BIGINT: Used to store very large integer values beyond the range of INT.
- DECIMAL: Used to store exact numeric values with fixed precision, commonly for financial data.
- FLOAT: Used to store approximate decimal numbers with single precision.
- DOUBLE: Used to store approximate decimal numbers with double precision for higher accuracy.

--- 

## Numeric types: kaunsa kab use karein (with code)

MySQL mein numeric types choose karna isliye important hai kyunki yeh **range**, **precision**, aur **storage** decide karte hain; integers counting/IDs ke liye aur decimals money/measurements ke liye use hote hain. 

## INT — standard whole numbers

`INT` 4 bytes store karta hai aur roughly −2 billion se +2 billion tak values support karta hai; yeh IDs, counts, quantities ke liye default choice hai. 

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  age INT,
  login_count INT NOT NULL DEFAULT 0
);

INSERT INTO users (age, login_count)
VALUES (24, 5);
```

**Use when:** normal range ke whole numbers chahiye (IDs, counts, quantities).

## TINYINT — very small integers, flags

`TINYINT` 1 byte hai aur −128 to 127 (signed) ya 0 to 255 (unsigned) range deta hai; booleans, status flags, ratings ke liye perfect hai. 

```sql
CREATE TABLE tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  is_done TINYINT(1) NOT NULL DEFAULT 0,  -- 0 = false, 1 = true
  priority TINYINT UNSIGNED NOT NULL DEFAULT 1 -- 1–5
);

INSERT INTO tasks (is_done, priority)
VALUES (1, 3);
```

**Use when:** boolean-like flags, small status codes, 1–5 ratings.

## SMALLINT — medium-small integers

`SMALLINT` 2 bytes hai aur roughly −32k to +32k range deta hai; jab `INT` se zyada space bachana ho aur values chhote hon. 

```sql
CREATE TABLE cities (
  id SMALLINT PRIMARY KEY AUTO_INCREMENT,
  code SMALLINT NOT NULL,
  population INT
);

INSERT INTO cities (code, population)
VALUES (101, 150000);
```

**Use when:** IDs ya codes jahan 32k se zyada values ki guarantee ho.

## BIGINT — very large integers

`BIGINT` 8 bytes hai aur extremely large range deta hai; high-scale systems, snowflake IDs, analytics counters ke liye use hota hai. 

```sql
CREATE TABLE events (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  event_time BIGINT NOT NULL  -- Unix timestamp in ms
);

INSERT INTO events (user_id, event_time)
VALUES (123456789012, 1724345678901);
```

**Use when:** IDs ya counters jo `INT` range cross kar sakte hain (large-scale apps, distributed IDs).

## DECIMAL — exact fixed-point numbers (money)

`DECIMAL(M,D)` exact numeric values store karta hai jahan `M` total digits aur `D` decimal ke baad digits hote hain; financial data ke liye yeh safest hai kyunki rounding errors nahi aate. 

```sql
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  tax DECIMAL(8,2) NOT NULL DEFAULT 0.00
);

INSERT INTO orders (user_id, total_amount, tax)
VALUES (1, 1999.95, 199.99);
```

**Use when:** prices, salaries, taxes, koi bhi exact decimal chahiye. 

## FLOAT — approximate single-precision

`FLOAT` binary floating-point use karta hai, isliye fast hai lekin exact decimal representation guarantee nahi hoti; scientific calculations, averages, measurements ke liye theek hai. 

```sql
CREATE TABLE measurements (
  id INT PRIMARY KEY AUTO_INCREMENT,
  temperature FLOAT,
  humidity FLOAT
);

INSERT INTO measurements (temperature, humidity)
VALUES (37.5, 60.2);
```

**Use when:** approximate values, scientific data, jahan thoda rounding acceptable ho.

## DOUBLE — approximate double-precision

`DOUBLE` bhi floating-point hai lekin `FLOAT` se zyada precision aur range deta hai; heavy numeric computations ke liye use hota hai. 

```sql
CREATE TABLE analytics (
  id INT PRIMARY KEY AUTO_INCREMENT,
  metric_value DOUBLE,
  score DOUBLE
);

INSERT INTO analytics (metric_value, score)
VALUES (123456.789, 0.987654321);
```

**Use when:** high-precision approximate calculations, ML features, statistics.

## Combined realistic example

```sql
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  sku CHAR(12) NOT NULL,
  stock_quantity INT NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  category_id SMALLINT,
  price DECIMAL(10,2) NOT NULL,
  discount_percent DECIMAL(5,2) DEFAULT 0.00,
  rating FLOAT,
  created_at_ts BIGINT
);
```

Yahan `price` ke liye `DECIMAL` use kiya gaya hai taaki money exact rahe, flags ke liye `TINYINT`, aur normal counts ke liye `INT`. 

## Quick decision guide

- **IDs, normal counts** → `INT`
- **Flags, booleans, small status** → `TINYINT`
- **Small-range integers** → `SMALLINT`
- **Huge IDs / counters** → `BIGINT`
- **Money, exact decimals** → `DECIMAL`
- **Approximate measurements** → `FLOAT`
- **High-precision approximate** → `DOUBLE`


___
___

## String Data Types
> *String Data Types in MySQL are used to store text or character data. These data types allow storing names, descriptions, emails, and other textual information.*


- CHAR: Used to store fixed-length character strings.
- VARCHAR: Used to store variable-length character strings.
- TEXT: Used to store large amounts of text data.
- TINYTEXT: Used to store very short text data.
- MEDIUMTEXT: Used to store medium-length text data.
- LONGTEXT: Used to store very large text values.

--- 

## String types: kaunsa kab use karein (with code)

MySQL mein text store karne ke liye mainly **CHAR**, **VARCHAR**, aur **TEXT** family use hoti hai; inme se har type ka storage behavior aur use case alag hai. 

## CHAR — fixed-length, short, predictable strings

`CHAR(N)` hamesha exactly `N` characters reserve karta hai; chhote values ko spaces se pad karke full length banaya jaata hai, isliye yeh fixed-length codes ke liye efficient hai. 

```sql
CREATE TABLE countries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  code CHAR(2) NOT NULL,        -- 'IN', 'US', 'GB'
  name VARCHAR(100) NOT NULL
);

INSERT INTO countries (code, name)
VALUES ('IN', 'India'), ('US', 'United States');
```

**Use when:** length almost always same ho (country codes, state codes, gender flags, fixed-length hashes). 

## VARCHAR — variable-length, most common text

`VARCHAR(N)` sirf actual characters + 1–2 bytes length prefix store karta hai, isliye names, emails, titles jahan length vary hoti hai, wahan yeh best hai. 

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20)
);

INSERT INTO users (name, email, phone)
VALUES ('Dev', 'dev@example.com', '+91-9876543210');
```

**Use when:** text length vary karta ho aur maximum length pata ho (names, emails, usernames, URLs). 

## TEXT family — large, unbounded text

`TEXT` types length limit ke hisaab se aate hain aur generally bade articles, logs, descriptions ke liye use hote hain; inme `CHAR`/`VARCHAR` ki tarah explicit length define nahi karte. )

```sql
CREATE TABLE blog_posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,                 -- up to ~65KB
  summary TINYTEXT,                   -- up to ~255 bytes
  excerpt MEDIUMTEXT,                 -- up to ~16MB
  full_content LONGTEXT               -- up to ~4GB
);

INSERT INTO blog_posts (title, body, summary, excerpt, full_content)
VALUES (
  'MySQL String Types',
  'This post explains CHAR, VARCHAR, and TEXT types...',
  'Short summary',
  'A medium-length excerpt explaining key points...',
  'Very long content that can go up to gigabytes...'
);
```

**Rough limits:**
- `TINYTEXT` ≈ 255 bytes
- `TEXT` ≈ 65,535 bytes (~64 KB)
- `MEDIUMTEXT` ≈ 16 MB
- `LONGTEXT` ≈ 4 GB 

**Use when:**
- `TINYTEXT` — very short notes, tags, tiny descriptions.
- `TEXT` — comments, messages, articles of normal size.
- `MEDIUMTEXT` — long documentation, logs, big descriptions.
- `LONGTEXT` — huge content like full books, massive logs (rare; often better to store files outside DB).

## Practical combined example

```sql
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  sku CHAR(12) NOT NULL,              -- fixed product code
  name VARCHAR(150) NOT NULL,         -- product name
  short_desc TINYTEXT,                -- one-line highlight
  description TEXT NOT NULL,          -- main product description
  specs MEDIUMTEXT,                   -- detailed specs
  manual LONGTEXT                     -- full PDF text / huge manual
);
```

Yahan `sku` fixed-length hai isliye `CHAR`, names/emails jaisa variable text `VARCHAR`, aur bade textual content ke liye `TEXT` family use ki gayi hai. 

## Quick rule of thumb

- **Fixed, short codes** → `CHAR`
- **Normal variable text** → `VARCHAR`
- **Large articles / logs** → `TEXT` / `MEDIUMTEXT` / `LONGTEXT`
- **Very small notes** → `TINYTEXT`


<!--  -->


--- 
***

## ENUM: single-choice, predefined options

`ENUM` ek aisa column type hai jahan tum pehle se **fixed list of allowed values** define karte ho, aur har row mein sirf **ek** value choose hoti hai. MySQL internally in strings ko integers mein encode kar deta hai, isliye storage compact aur comparisons fast hote hain. 

**Example:**

```sql
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  status ENUM('pending', 'paid', 'shipped', 'cancelled') NOT NULL
);

INSERT INTO orders (status) VALUES ('pending');
```

Yahan `status` column sirf in 4 values mein se ek hi accept karega; `'refunded'` dalne par error aayega. 

**Storage & performance:**  
- Up to 255 values → 1 byte per row  
- 256–65,535 values → 2 bytes per row  
- Internally integer index store hota hai, isliye string comparison se faster hota hai. 

## SET: multiple-choice, predefined options

`SET` bhi predefined list leta hai, lekin ek row mein **ek ya zyada** values choose kar sakte ho. Values comma-separated insert hoti hain, aur internally bitmap ke form mein store hoti hain. 

**Example:**

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  roles SET('admin', 'editor', 'viewer') NOT NULL
);

INSERT INTO users (roles) VALUES ('admin,viewer');
```

Ek `SET` column mein maximum 64 distinct members ho sakte hain. 

## Real-life use cases

- **ENUM** — order status, payment status, gender (limited options), ticket state (`open`, `in_progress`, `closed`).
- **SET** — user roles (ek user ke paas multiple roles ho sakte hain), notification preferences (`email`, `sms`, `push`), feature flags.

## ENUM vs VARCHAR: pros & cons

**Pros of ENUM:**
- Compact storage (1–2 bytes) vs full string.
- Built-in validation: invalid value insert hi nahi hoga.
- Faster comparisons (integer vs string). 

**Cons of ENUM:**
- Schema change mushkil: new value add karne ke liye `ALTER TABLE` chahiye.
- Portability kam: har DB engine ENUM ko same treat nahi karta.
- Application layer par flexibility kam; dynamic values ke liye unsuitable.

Isliye modern apps mein simple statuses ke liye bhi `VARCHAR` + application-level validation common hai, lekin strict, stable, small lists ke liye `ENUM` still useful hai. 

## Quick decision guide

- **Single choice, fixed, small list** → `ENUM`
- **Multiple choices, fixed list** → `SET`
- **Dynamic / frequently changing options** → `VARCHAR` (with app-side validation or lookup table)

---
***


## Date and Time Data Types
- *Date and Time Data Types in MySQL are used to store date and time values. They help manage information such as timestamps, event dates, and schedules.*

- DATE: Used to store date values in YYYY-MM-DD format.
- TIME: Used to store time values in HH:MM:SS format.
- DATETIME: Used to store both date and time values.
- TIMESTAMP: Used to store date and time values with automatic updates.
- YEAR: Used to store year values in four-digit format.

***

## Date & Time types: kaunsa kab use karein (with code)

MySQL mein date/time types isliye important hain kyunki yeh **storage format**, **timezone behavior**, aur **automatic updates** decide karte hain; sahi type choose karne se timestamps, events, aur schedules manage karna easy hota hai. 

## DATE — sirf date (YYYY-MM-DD)

`DATE` sirf date store karta hai, time nahi; birthdays, event dates, due dates ke liye best hai. 

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  birth_date DATE
);

INSERT INTO users (name, birth_date)
VALUES ('Dev', '2000-05-15');
```

**Use when:** sirf date chahiye, time matter nahi karta.

## TIME — sirf time (HH:MM:SS)

`TIME` sirf time-of-day ya duration store karta hai; meeting times, daily schedules, ya time intervals ke liye use hota hai. 

```sql
CREATE TABLE daily_schedule (
  id INT PRIMARY KEY AUTO_INCREMENT,
  activity VARCHAR(100),
  start_time TIME,
  duration TIME
);

INSERT INTO daily_schedule (activity, start_time, duration)
VALUES ('Coding', '09:00:00', '02:30:00');
```

**Use when:** sirf time ya duration store karna ho, date nahi.

## DATETIME — date + time, fixed

`DATETIME` date aur time dono store karta hai (`YYYY-MM-DD HH:MM:SS`), aur yeh timezone-independent hota hai; events, logs, aur fixed timestamps ke liye common choice hai. 

```sql
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  order_date DATETIME NOT NULL
);

INSERT INTO orders (user_id, order_date)
VALUES (1, '2026-08-22 15:30:00');
```

**Use when:** exact date+time chahiye aur automatic update nahi chahiye.

## TIMESTAMP — date+time with automatic behavior

`TIMESTAMP` bhi date+time store karta hai, lekin yeh timezone-aware hota hai aur `DEFAULT CURRENT_TIMESTAMP` / `ON UPDATE CURRENT_TIMESTAMP` ke saath auto-update support karta hai; `created_at`, `updated_at` columns ke liye ideal hai. 

```sql
CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO posts (title)
VALUES ('MySQL Date Types');
```

**Use when:** creation/update timestamps chahiye jo automatically manage hon.

## YEAR — sirf year (YYYY)

`YEAR` 4-digit year store karta hai; birth year, fiscal year, ya yearly reports ke liye use hota hai. 

```sql
CREATE TABLE annual_reports (
  id INT PRIMARY KEY AUTO_INCREMENT,
  report_year YEAR NOT NULL,
  revenue DECIMAL(12,2)
);

INSERT INTO annual_reports (report_year, revenue)
VALUES (2025, 1250000.00);
```

**Use when:** sirf year store karna ho, month/day matter nahi.

## Combined realistic example

```sql
CREATE TABLE events (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  event_date DATE NOT NULL,          -- only date
  start_time TIME,                   -- only time
  scheduled_at DATETIME,             -- fixed date+time
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fiscal_year YEAR
);

INSERT INTO events (name, event_date, start_time, scheduled_at, fiscal_year)
VALUES (
  'Tech Meetup',
  '2026-09-10',
  '18:00:00',
  '2026-09-10 18:00:00',
  2026
);
```

Yahan `event_date` ke liye `DATE`, `start_time` ke liye `TIME`, fixed schedule ke liye `DATETIME`, aur auto-managed timestamps ke liye `TIMESTAMP` use kiya gaya hai.

## Quick decision guide

- **Sirf date** → `DATE`
- **Sirf time / duration** → `TIME`
- **Fixed date+time** → `DATETIME`
- **Auto-updating timestamps** → `TIMESTAMP`
- **Sirf year** → `YEAR`

---
***

## Spatial Data Types
> *Spatial Data Types in MySQL are used to store geometric and geographic data. These data types are commonly used in location-based applications and geographic information systems.*

- GEOMETRY: Used to store geometric objects such as points, lines, and polygons.
- POINT: Used to store a single coordinate location.
- LINESTRING: Used to store a line formed by multiple points.
- POLYGON: Used to store polygon shapes defined by multiple coordinates.

***

## Spatial types: kaunsa kab use karein (with code)

MySQL spatial types geometric aur geographic data store karne ke liye hote hain; maps, location-based features, aur GIS applications mein inka use hota hai. 

## GEOMETRY — base type for any geometric object

`GEOMETRY` ek generic type hai jo kisi bhi geometric object (point, line, polygon, etc.) ko store kar sakta hai; jab specific type pata na ho ya flexible rakhna ho to use karte hain. [dev.mysql](https://dev.mysql.com/doc/refman/8.4/en/data-types.html)

```sql
CREATE TABLE geo_objects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  shape GEOMETRY
);

-- Example: store a point as GEOMETRY
INSERT INTO geo_objects (name, shape)
VALUES ('Delhi', ST_GeomFromText('POINT(77.1025 28.7041)'));
```

**Use when:** generic geometric storage chahiye ya multiple geometry types ek hi column mein.

## POINT — single coordinate (latitude, longitude)

`POINT` ek single location store karta hai; user locations, store locations, POI (point of interest) ke liye best hai. [dev.mysql](https://dev.mysql.com/doc/refman/8.4/en/data-types.html)

```sql
CREATE TABLE stores (
  id INT PRIMARY KEY AUTO_INCREMENT,
  store_name VARCHAR(150),
  location POINT NOT NULL SRID 4326  -- WGS84 for lat/lon
);

INSERT INTO stores (store_name, location)
VALUES ('Main Branch', ST_PointFromText('POINT(77.1025 28.7041)', 4326));
```

**Use when:** ek exact coordinate (lat, lon) store karna ho.

## LINESTRING — line formed by multiple points

`LINESTRING` multiple points ko connect karke ek line banata hai; routes, paths, delivery tracks ke liye use hota hai. [dev.mysql](https://dev.mysql.com/doc/refman/8.4/en/data-types.html)

```sql
CREATE TABLE routes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  route_name VARCHAR(150),
  path LINESTRING NOT NULL SRID 4326
);

INSERT INTO routes (route_name, path)
VALUES (
  'Office to Home',
  ST_LineStringFromText(
    'LINESTRING(77.1025 28.7041, 77.2065 28.6139)',
    4326
  )
);
```

**Use when:** do ya zyada points ke beech ka path/store route represent karna ho.

## POLYGON — area defined by boundary points

`POLYGON` closed shape store karta hai; delivery zones, city boundaries, service areas ke liye use hota hai. [dev.mysql](https://dev.mysql.com/doc/refman/8.4/en/data-types.html)

```sql
CREATE TABLE delivery_zones (
  id INT PRIMARY KEY AUTO_INCREMENT,
  zone_name VARCHAR(150),
  area POLYGON NOT NULL SRID 4326
);

INSERT INTO delivery_zones (zone_name, area)
VALUES (
  'Central Zone',
  ST_PolyFromText(
    'POLYGON((
      77.10 28.70,
      77.20 28.70,
      77.20 28.60,
      77.10 28.60,
      77.10 28.70
    ))',
    4326
  )
);
```

**Use when:** kisi area ya boundary ko define karna ho (zones, regions).

## Combined realistic example

```sql
CREATE TABLE logistics (
  id INT PRIMARY KEY AUTO_INCREMENT,
  warehouse_name VARCHAR(150),
  warehouse_location POINT NOT NULL SRID 4326,
  service_area POLYGON SRID 4326,
  main_route LINESTRING SRID 4326
);

INSERT INTO logistics (warehouse_name, warehouse_location, service_area, main_route)
VALUES (
  'North Warehouse',
  ST_PointFromText('POINT(77.1025 28.7041)', 4326),
  ST_PolyFromText(
    'POLYGON((77.10 28.70, 77.20 28.70, 77.20 28.60, 77.10 28.60, 77.10 28.70))',
    4326
  ),
  ST_LineStringFromText('LINESTRING(77.1025 28.7041, 77.2065 28.6139)', 4326)
);
```

Yahan `warehouse_location` ke liye `POINT`, `service_area` ke liye `POLYGON`, aur `main_route` ke liye `LINESTRING` use kiya gaya hai.

## Quick decision guide

- **Single location (lat, lon)** → `POINT`
- **Route / path** → `LINESTRING`
- **Area / zone / boundary** → `POLYGON`
- **Generic / mixed geometry** → `GEOMETRY`

---

