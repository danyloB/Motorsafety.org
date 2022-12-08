/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateContactUs = /* GraphQL */ `
  subscription OnCreateContactUs {
    onCreateContactUs {
      id
      createdAt
      department
      email
      message
      name
    }
  }
`;
export const onUpdateContactUs = /* GraphQL */ `
  subscription OnUpdateContactUs {
    onUpdateContactUs {
      id
      createdAt
      department
      email
      message
      name
    }
  }
`;
export const onDeleteContactUs = /* GraphQL */ `
  subscription OnDeleteContactUs {
    onDeleteContactUs {
      id
      createdAt
      department
      email
      message
      name
    }
  }
`;
export const onCreateDealer = /* GraphQL */ `
  subscription OnCreateDealer {
    onCreateDealer {
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
export const onUpdateDealer = /* GraphQL */ `
  subscription OnUpdateDealer {
    onUpdateDealer {
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
export const onDeleteDealer = /* GraphQL */ `
  subscription OnDeleteDealer {
    onDeleteDealer {
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
export const onCreateModel = /* GraphQL */ `
  subscription OnCreateModel {
    onCreateModel {
      make
      models
      year
    }
  }
`;
export const onUpdateModel = /* GraphQL */ `
  subscription OnUpdateModel {
    onUpdateModel {
      make
      models
      year
    }
  }
`;
export const onDeleteModel = /* GraphQL */ `
  subscription OnDeleteModel {
    onDeleteModel {
      make
      models
      year
    }
  }
`;
export const onCreateMyGarage = /* GraphQL */ `
  subscription OnCreateMyGarage {
    onCreateMyGarage {
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
export const onUpdateMyGarage = /* GraphQL */ `
  subscription OnUpdateMyGarage {
    onUpdateMyGarage {
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
export const onDeleteMyGarage = /* GraphQL */ `
  subscription OnDeleteMyGarage {
    onDeleteMyGarage {
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
export const onCreateDealerClaimRequest = /* GraphQL */ `
  subscription OnCreateDealerClaimRequest {
    onCreateDealerClaimRequest {
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
export const onUpdateDealerClaimRequest = /* GraphQL */ `
  subscription OnUpdateDealerClaimRequest {
    onUpdateDealerClaimRequest {
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
export const onDeleteDealerClaimRequest = /* GraphQL */ `
  subscription OnDeleteDealerClaimRequest {
    onDeleteDealerClaimRequest {
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
export const onCreateAppointment = /* GraphQL */ `
  subscription OnCreateAppointment {
    onCreateAppointment {
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
export const onUpdateAppointment = /* GraphQL */ `
  subscription OnUpdateAppointment {
    onUpdateAppointment {
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
export const onDeleteAppointment = /* GraphQL */ `
  subscription OnDeleteAppointment {
    onDeleteAppointment {
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
export const onCreateSubscribe = /* GraphQL */ `
  subscription OnCreateSubscribe {
    onCreateSubscribe {
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
export const onUpdateSubscribe = /* GraphQL */ `
  subscription OnUpdateSubscribe {
    onUpdateSubscribe {
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
export const onDeleteSubscribe = /* GraphQL */ `
  subscription OnDeleteSubscribe {
    onDeleteSubscribe {
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
export const onCreateV2FlatRecall = /* GraphQL */ `
  subscription OnCreateV2FlatRecall {
    onCreateV2FlatRecall {
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
export const onUpdateV2FlatRecall = /* GraphQL */ `
  subscription OnUpdateV2FlatRecall {
    onUpdateV2FlatRecall {
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
export const onDeleteV2FlatRecall = /* GraphQL */ `
  subscription OnDeleteV2FlatRecall {
    onDeleteV2FlatRecall {
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
export const onCreateV2FlatRecallCountByType = /* GraphQL */ `
  subscription OnCreateV2FlatRecallCountByType {
    onCreateV2FlatRecallCountByType {
      count
      type
    }
  }
`;
export const onUpdateV2FlatRecallCountByType = /* GraphQL */ `
  subscription OnUpdateV2FlatRecallCountByType {
    onUpdateV2FlatRecallCountByType {
      count
      type
    }
  }
`;
export const onDeleteV2FlatRecallCountByType = /* GraphQL */ `
  subscription OnDeleteV2FlatRecallCountByType {
    onDeleteV2FlatRecallCountByType {
      count
      type
    }
  }
`;
