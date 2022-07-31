import { IsNotEmpty } from 'class-validator';

export class PostDto {
    @IsNotEmpty()
    readonly body: string;
}
