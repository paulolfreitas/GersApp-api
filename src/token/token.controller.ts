import { Body, Controller, Put } from "@nestjs/common";
import { RefreshTokenDto } from "./dto/refresh.token.dto";
import { TokenService } from "./token.service";

@Controller('token')
export class TokenController{
    constructor(
        private tokenService: TokenService
    ){}
//methd to refesh the token, since the token is valid for 60s
    @Put('refresh')
    async refreshToken(@Body() data: RefreshTokenDto){
        return this.tokenService.refreshToken(data.oldToken)
    }
}