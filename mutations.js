/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const saveAppointment = /* GraphQL */ `
  mutation SaveAppointment($input: CreateAppointmentInput!) {
    saveAppointment(input: $input) {
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
export const createContactUs = /* GraphQL */ `
  mutation CreateContactUs(
    $input: CreateContactUsInput!
    $condition: ModelContactUsConditionInput
  ) {
    createContactUs(input: $input, condition: $condition) {
      id
      createdAt
      department
      email
      message
      name
    }
  }
`;
export const updateContactUs = /* GraphQL */ `
  mutation UpdateContactUs(
    $input: UpdateContactUsInput!
    $condition: ModelContactUsConditionInput
  ) {
    updateContactUs(input: $input, condition: $condition) {
      id
      createdAt
      department
      email
      message
      name
    }
  }
`;
export const deleteContactUs = /* GraphQL */ `
  mutation DeleteContactUs(
    $input: DeleteContactUsInput!
    $condition: ModelContactUsConditionInput
  ) {
    deleteContactUs(input: $input, condition: $condition) {
      id
      createdAt
      department
      email
      message
      name
    }
  }
`;
export const createDealer = /* GraphQL */ `
  mutation CreateDealer(
    $input: CreateDealerInput!
    $condition: ModelDealerConditionInput
  ) {
    createDealer(input: $input, condition: $condition) {
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
export const updateDealer = /* GraphQL */ `
  mutation UpdateDealer(
    $input: UpdateDealerInput!
    $condition: ModelDealerConditionInput
  ) {
    updateDealer(input: $input, condition: $condition) {
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
export const deleteDealer = /* GraphQL */ `
  mutation DeleteDealer(
    $input: DeleteDealerInput!
    $condition: ModelDealerConditionInput
  ) {
    deleteDealer(input: $input, condition: $condition) {
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
export const createModel = /* GraphQL */ `
  mutation CreateModel(
    $input: CreateModelInput!
    $condition: ModelModelConditionInput
  ) {
    createModel(input: $input, condition: $condition) {
      make
      models
      year
    }
  }
`;
export const updateModel = /* GraphQL */ `
  mutation UpdateModel(
    $input: UpdateModelInput!
    $condition: ModelModelConditionInput
  ) {
    updateModel(input: $input, condition: $condition) {
      make
      models
      year
    }
  }
`;
export const deleteModel = /* GraphQL */ `
  mutation DeleteModel(
    $input: DeleteModelInput!
    $condition: ModelModelConditionInput
  ) {
    deleteModel(input: $input, condition: $condition) {
      make
      models
      year
    }
  }
`;
export const createMyGarage = /* GraphQL */ `
  mutation CreateMyGarage(
    $input: CreateMyGarageInput!
    $condition: ModelMyGarageConditionInput
  ) {
    createMyGarage(input: $input, condition: $condition) {
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
export const updateMyGarage = /* GraphQL */ `
  mutation UpdateMyGarage(
    $input: UpdateMyGarageInput!
    $condition: ModelMyGarageConditionInput
  ) {
    updateMyGarage(input: $input, condition: $condition) {
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
export const deleteMyGarage = /* GraphQL */ `
  mutation DeleteMyGarage(
    $input: DeleteMyGarageInput!
    $condition: ModelMyGarageConditionInput
  ) {
    deleteMyGarage(input: $input, condition: $condition) {
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
export const createDealerClaimRequest = /* GraphQL */ `
  mutation CreateDealerClaimRequest(
    $input: CreateDealerClaimRequestInput!
    $condition: ModelDealerClaimRequestConditionInput
  ) {
    createDealerClaimRequest(input: $input, condition: $condition) {
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
export const updateDealerClaimRequest = /* GraphQL */ `
  mutation UpdateDealerClaimRequest(
    $input: UpdateDealerClaimRequestInput!
    $condition: ModelDealerClaimRequestConditionInput
  ) {
    updateDealerClaimRequest(input: $input, condition: $condition) {
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
export const deleteDealerClaimRequest = /* GraphQL */ `
  mutation DeleteDealerClaimRequest(
    $input: DeleteDealerClaimRequestInput!
    $condition: ModelDealerClaimRequestConditionInput
  ) {
    deleteDealerClaimRequest(input: $input, condition: $condition) {
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
export const createAppointment = /* GraphQL */ `
  mutation CreateAppointment(
    $input: CreateAppointmentInput!
    $condition: ModelAppointmentConditionInput
  ) {
    createAppointment(input: $input, condition: $condition) {
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
export const updateAppointment = /* GraphQL */ `
  mutation UpdateAppointment(
    $input: UpdateAppointmentInput!
    $condition: ModelAppointmentConditionInput
  ) {
    updateAppointment(input: $input, condition: $condition) {
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
export const deleteAppointment = /* GraphQL */ `
  mutation DeleteAppointment(
    $input: DeleteAppointmentInput!
    $condition: ModelAppointmentConditionInput
  ) {
    deleteAppointment(input: $input, condition: $condition) {
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
export const createSubscribe = /* GraphQL */ `
  mutation CreateSubscribe(
    $input: CreateSubscribeInput!
    $condition: ModelSubscribeConditionInput
  ) {
    createSubscribe(input: $input, condition: $condition) {
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
export const updateSubscribe = /* GraphQL */ `
  mutation UpdateSubscribe(
    $input: UpdateSubscribeInput!
    $condition: ModelSubscribeConditionInput
  ) {
    updateSubscribe(input: $input, condition: $condition) {
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
export const deleteSubscribe = /* GraphQL */ `
  mutation DeleteSubscribe(
    $input: DeleteSubscribeInput!
    $condition: ModelSubscribeConditionInput
  ) {
    deleteSubscribe(input: $input, condition: $condition) {
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
