/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listVinRecalls = /* GraphQL */ `
  query ListVinRecalls($vin: String!) {
    listVinRecalls(vin: $vin) {
      api_request_id
      customer {
        address
        city
        customer
        email
        first_name
        last_name
        locator
        phone
        state
        zipcode
        zipcode_extra
      }
      error_description
      id
      internal_record_id
      last_updated
      make
      model_name
      model_year
      recall_count
      recalls {
        are_parts_available
        campaign_type
        child
        description
        dont_drive
        effective_date
        expiration_date
        forbidden_reason
        government_id
        is_forbidden
        is_preinspection_required
        is_remedy_available
        is_reviewed
        labor_difficulty
        labor_max
        labor_min
        name
        nhtsa_id
        oem_id
        overall_rank
        parts_available_date
        profit_rank
        recall_age
        recall_id
        recall_last_updated
        remedy
        risk
        risk_rank
        risk_type
        stop_sale
      }
      status
      use_type
      user
      user_description
      vin
    }
  }
`;
export const listNhtsaRecalls = /* GraphQL */ `
  query ListNhtsaRecalls($query: NhtsaRecallInput!) {
    listNhtsaRecalls(query: $query) {
      Count
      Message
      Results {
        Component
        Conequence
        Make
        Manufacturer
        Model
        ModelYear
        NHTSACampaignNumber
        Notes
        Remedy
        ReportReceivedDate
        Summary
      }
    }
  }
`;
export const searchByDistance = /* GraphQL */ `
  query SearchByDistance(
    $make: String!
    $zip: String!
    $mi: Int
    $location: String
    $nextToken: String
    $from: Int
    $limit: Int
  ) {
    searchByDistance(
      make: $make
      zip: $zip
      mi: $mi
      location: $location
      nextToken: $nextToken
      from: $from
      limit: $limit
    ) {
      items {
        address
        location
        brand
        city
        city_slug
        city_state_slug
        crm_id
        google_place_id
        google_place_url
        id
        is_trusted
        latitude
        longitude
        name
        phone_number_main
        phone_number_service
        service_hours
        slug
        state
        state_slug
        utc_offset
        website
        zip
      }
      total
      nextToken
    }
  }
`;
export const getContactUs = /* GraphQL */ `
  query GetContactUs($id: String!, $createdAt: AWSDateTime!) {
    getContactUs(id: $id, createdAt: $createdAt) {
      id
      createdAt
      department
      email
      message
      name
    }
  }
`;
export const listContactUss = /* GraphQL */ `
  query ListContactUss(
    $id: String
    $createdAt: ModelStringKeyConditionInput
    $filter: ModelContactUsFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listContactUss(
      id: $id
      createdAt: $createdAt
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        createdAt
        department
        email
        message
        name
      }
      nextToken
    }
  }
`;
export const getDealer = /* GraphQL */ `
  query GetDealer($id: Int!) {
    getDealer(id: $id) {
      address
      location
      brand
      city
      city_slug
      city_state_slug
      crm_id
      google_place_id
      google_place_url
      id
      is_trusted
      latitude
      longitude
      name
      phone_number_main
      phone_number_service
      service_hours
      slug
      state
      state_slug
      utc_offset
      website
      zip
    }
  }
`;
export const listDealers = /* GraphQL */ `
  query ListDealers(
    $id: Int
    $filter: ModelDealerFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listDealers(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        address
        location
        brand
        city
        city_slug
        city_state_slug
        crm_id
        google_place_id
        google_place_url
        id
        is_trusted
        latitude
        longitude
        name
        phone_number_main
        phone_number_service
        service_hours
        slug
        state
        state_slug
        utc_offset
        website
        zip
      }
      nextToken
    }
  }
`;
export const getModel = /* GraphQL */ `
  query GetModel($make: String!, $year: Int!) {
    getModel(make: $make, year: $year) {
      make
      models
      year
    }
  }
`;
export const listModels = /* GraphQL */ `
  query ListModels(
    $make: String
    $year: ModelIntKeyConditionInput
    $filter: ModelModelFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listModels(
      make: $make
      year: $year
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        make
        models
        year
      }
      nextToken
    }
  }
`;
export const getMyGarage = /* GraphQL */ `
  query GetMyGarage($username: String!) {
    getMyGarage(username: $username) {
      data {
        createdAt
        make
        model
        vin
        year
      }
      username
    }
  }
`;
export const listMyGarages = /* GraphQL */ `
  query ListMyGarages(
    $username: String
    $filter: ModelMyGarageFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listMyGarages(
      username: $username
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        data {
          createdAt
          make
          model
          vin
          year
        }
        username
      }
      nextToken
    }
  }
`;
export const getDealerClaimRequest = /* GraphQL */ `
  query GetDealerClaimRequest($id: String!) {
    getDealerClaimRequest(id: $id) {
      address
      brand
      city
      city_slug
      city_state_slug
      created_at
      crm_id
      dealer_id
      email
      google_place_id
      google_place_url
      id
      is_trusted
      latitude
      longitude
      name
      phone_number_main
      phone_number_service
      service_hours
      slug
      state
      state_slug
      status
      utc_offset
      website
      zip
    }
  }
`;
export const listDealerClaimRequests = /* GraphQL */ `
  query ListDealerClaimRequests(
    $id: String
    $filter: ModelDealerClaimRequestFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listDealerClaimRequests(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        address
        brand
        city
        city_slug
        city_state_slug
        created_at
        crm_id
        dealer_id
        email
        google_place_id
        google_place_url
        id
        is_trusted
        latitude
        longitude
        name
        phone_number_main
        phone_number_service
        service_hours
        slug
        state
        state_slug
        status
        utc_offset
        website
        zip
      }
      nextToken
    }
  }
`;
export const getAppointment = /* GraphQL */ `
  query GetAppointment($id: String!) {
    getAppointment(id: $id) {
      createdAt
      dealer_id
      dealership
      email
      id
      make
      message
      model
      name
      phone_number
      vin
      year
      zip
    }
  }
`;
export const listAppointments = /* GraphQL */ `
  query ListAppointments(
    $id: String
    $filter: ModelAppointmentFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listAppointments(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        createdAt
        dealer_id
        dealership
        email
        id
        make
        message
        model
        name
        phone_number
        vin
        year
        zip
      }
      nextToken
    }
  }
`;
export const getSubscribe = /* GraphQL */ `
  query GetSubscribe($email: String!) {
    getSubscribe(email: $email) {
      data {
        createdAt
        make
        model
        type
        vin
        year
      }
      email
    }
  }
`;
export const listSubscribes = /* GraphQL */ `
  query ListSubscribes(
    $email: String
    $filter: ModelSubscribeFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSubscribes(
      email: $email
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        data {
          createdAt
          make
          model
          type
          vin
          year
        }
        email
      }
      nextToken
    }
  }
`;
export const getV2FlatRecall = /* GraphQL */ `
  query GetV2FlatRecall($recall_id: Int!) {
    getV2FlatRecall(recall_id: $recall_id) {
      component
      conequence
      make
      manufacturer
      model
      model_year
      nhtsa_campaign_number
      notes
      remedy
      name
      recall_date
      recall_id
      summary
      type
    }
  }
`;
export const listV2FlatRecalls = /* GraphQL */ `
  query ListV2FlatRecalls(
    $recall_id: Int
    $filter: ModelV2FlatRecallFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listV2FlatRecalls(
      recall_id: $recall_id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        component
        conequence
        make
        manufacturer
        model
        model_year
        nhtsa_campaign_number
        notes
        remedy
        name
        recall_date
        recall_id
        summary
        type
      }
      nextToken
    }
  }
`;
export const getV2FlatRecallCountByType = /* GraphQL */ `
  query GetV2FlatRecallCountByType($type: String!) {
    getV2FlatRecallCountByType(type: $type) {
      count
      type
    }
  }
`;
export const listV2FlatRecallCountByTypes = /* GraphQL */ `
  query ListV2FlatRecallCountByTypes(
    $type: String
    $filter: ModelV2FlatRecallCountByTypeFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listV2FlatRecallCountByTypes(
      type: $type
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        count
        type
      }
      nextToken
    }
  }
`;
export const recallsByType = /* GraphQL */ `
  query RecallsByType(
    $type: String
    $sortDirection: ModelSortDirection
    $filter: ModelV2FlatRecallFilterInput
    $limit: Int
    $nextToken: String
  ) {
    recallsByType(
      type: $type
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        component
        conequence
        make
        manufacturer
        model
        model_year
        nhtsa_campaign_number
        notes
        remedy
        name
        recall_date
        recall_id
        summary
        type
      }
      nextToken
    }
  }
`;
export const searchDealers = /* GraphQL */ `
  query SearchDealers(
    $filter: SearchableDealerFilterInput
    $sort: SearchableDealerSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchDealers(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        address
        location
        brand
        city
        city_slug
        city_state_slug
        crm_id
        google_place_id
        google_place_url
        id
        is_trusted
        latitude
        longitude
        name
        phone_number_main
        phone_number_service
        service_hours
        slug
        state
        state_slug
        utc_offset
        website
        zip
      }
      nextToken
      total
    }
  }
`;
export const searchDealerClaimRequests = /* GraphQL */ `
  query SearchDealerClaimRequests(
    $filter: SearchableDealerClaimRequestFilterInput
    $sort: SearchableDealerClaimRequestSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchDealerClaimRequests(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        address
        brand
        city
        city_slug
        city_state_slug
        created_at
        crm_id
        dealer_id
        email
        google_place_id
        google_place_url
        id
        is_trusted
        latitude
        longitude
        name
        phone_number_main
        phone_number_service
        service_hours
        slug
        state
        state_slug
        status
        utc_offset
        website
        zip
      }
      nextToken
      total
    }
  }
`;
