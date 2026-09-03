import { type PipeTransform, Injectable, type ArgumentMetadata, BadRequestException } from "@nestjs/common";

@Injectable()
export class TaskValidationPipe implements PipeTransform{
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(`[Pipe] Validating argument: ${metadata.data}`)

    const { title, description } = value;

    if (!title || !description) {
      throw new BadRequestException('Title and Description are required');
    }

    if (typeof title !== 'string' || title.length < 3) {
      throw new BadRequestException('Title must be a string of at least 3 characters');
    }

    return value;
  }
}