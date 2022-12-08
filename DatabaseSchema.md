### V2FlatRecall

| Name       | Type   |
|------------|--------|
|recall_id|String|
|Component|String|
|Conequence|String|
|Make|String|
|Manufacturer|String|
|Model|String|
|ModelYear|Int|
|NHTSACampaignNumber|String|
|Notes|String|
|Remedy|String|
|name|String|
|summary|String|
|type|String|
|recallDate|String|

### V2FlatRecall-Count-By-Type
| Name       | Type   |
|------------|--------|
| type       | String   |
| count       | Int   |

### V2_Motorsafety_Subscribe

| Name       | Type   |
|------------|--------|
| email       | String   |
| data       | [SubscriberItem]|

SubscriberItem

| Name       | Type   |
|------------|--------|
| createdAt| Int|
| make|String|
| model|String|
| year|String|
| type|String|

### V2_Motorsafety_Models

| Name       | Type   |
|------------|--------|
| year| Int|
| make|String|
| models|[String]|

### MyGarage

| Name       | Type   |
|------------|--------|
| username|String|
| data|[MyGarageItem]|

MyGarageItem

| Name       | Type   |
|------------|--------|
| createdAt|Int|
| make|String|
| model|String|
| year|Int|
| vin|String|

### DealerCity
List all cities for searching dealers

| Name       | Type   |
|------------|--------|
| city_key|String|
| city_name|String|

### DealerOutput
Dealers data imported from output.csv file
For searching dealers

| Name       | Type   |
|------------|--------|
| id|String|
| dealership|String|
| has_deals| Boolean |
| has_people| Boolean|
| city |String |
|city_key |String |
| phone| String|
| postal_code| String|
| zip| String|
| address| String|
| state|String |
| website| String|
| brand| String|
| service_website| String|
| brand_score|Float |
| city_score| Float|
| overall_score| Float|
| unique| String|
| service_appointment_system|String |
| region|String |
| local_phone_number|String |
| latitude| Float|
| longitude| Float |
| poc_phone| String|
| about|String |
| close_hours|String |
| open_hours| String|


### DealerClaimRequest
Claim dealership data

| Name       | Type   |
|------------|--------|
| id|String|
| about|String|
| address|String|
| city|String|
| city_key|String|
| dealer_id|String|
| dealership|String|
| email|String|
| open_hours|String|
| phone|String|
| state|String|
| status|String|
| website|String|
| zip|String|
| close_hours|String|

