import { Controller, Get, Param, Query, Request, UseGuards } from '@nestjs/common';
import { DestinationsService } from './services/destinations.service';
import { GetDestinationDto } from './dto/get-destinations.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/config/guard/jwt-auth.guard';

@Controller({
  version: '1',
  path: 'destinations',
})
@ApiTags('v1/destinations')
export class DestinationsController {

  constructor(
    private readonly destinationsService: DestinationsService,
  ) { }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findAll(
    @Query() dto: GetDestinationDto,
    @Request() req,
  ) {
    return this.destinationsService.findAll(dto, req.user);
  }

  @Get('packages')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findPackages() {
    return this.destinationsService.getPackages();
  }

  @Get('generated/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getGeneratedById(@Param('id') id: number) {
    return this.destinationsService.getGeneratedById(id);
  }


  @Get('package/:slug')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findPackage(@Param('slug') slug: string) {
    return this.destinationsService.getPackage(slug);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.destinationsService.findOne(id);
  }
}
