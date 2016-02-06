declare type Party = {
  _id?: string,
  name: string,
  description?: string,
  location: string,
  owner?: string,
  public: boolean,
  invited?: Array<string>,
  rsvps?: Array<RSVP>
}

declare type RSVP = {
  userId: string,
  response: string
}
