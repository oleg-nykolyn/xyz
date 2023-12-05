import { ApiProperty } from '@nestjs/swagger';

export class NonceDto {
  @ApiProperty({
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  nonce: string;

  private constructor(nonce: string) {
    this.nonce = nonce;
  }

  static of(nonce: string): NonceDto {
    return new NonceDto(nonce);
  }
}
