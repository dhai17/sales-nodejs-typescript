import { transport } from "./mailconfig"

export const sendMailCreateUser = (name:string ,) => {
     transport.sendMail({
          to:'ỳufttyd@fpt.edu.vn',
          subject:'aaaa',
          text:"xin chào"
     })
}