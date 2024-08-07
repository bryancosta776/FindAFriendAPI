export class OrgDoesNotExists extends Error {
  constructor() {
    super("ORG does not exists.");
  }
}
