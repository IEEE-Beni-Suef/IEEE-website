# IEEE Management

## normal member

can see his assignments and his profile and his committee and the best members of the month on the branch and the committee

## hr member

can see all his profile and can see the committees he is assigned to members and assign rating to their attendance and add behaviors

## head member

can see all his profile and can see the committees he is assigned to members and assign rating to their assignments and add behaviors and can add new members to the branch and can assign tasks to the members and can make like a post or make agenda for meetings

## high board member

can see all his profile and can see all committees is assigned to and can add new members to the branch can make agenda for general meetings and events and can add new committees and can assign rating to the head, vice head and the committee

## Tasks

- [ ] Set react-hook-form, zod
- [ ] Make a HOC for the input field
- [ ] Adjust the Sign in forms and sign up to the api
- [ ] Have a protected router for the dashboard
- [ ] Make a dashboard layout with the sidebar and the header
- [ ] Make the dashboard pages for the normal member, hr member, head member and high board member
- [ ] Use tanstack query, Axios for the api calls

## schemas

### Sign Up Schema

```json
{
  "userName": "MGM",
  "fName": "string",
  "mName": "string",
  "lName": "string",
  "password": "string",
  "email": "user@example.com",
  "committeeIds": [0],
  "year": "string",
  "sex": "string",
  "faculty": "string",
  "city": "string",
  "phone": "string",
  "goverment": "string",
  "roleId": 0
}
```

### Sign In Schema

```json
{
  "userName": "string",
  "password": "string"
}
```

### packages

- [react-hook-form](https://react-hook-form.com/)
- [zod](https://zod.dev/)
- [axios](https://axios-http.com/)
- [react-query](https://react-query.tanstack.com/)
