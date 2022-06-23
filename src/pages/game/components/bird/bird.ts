import { PipeConstants } from 'pages/game/components/pipe';
import bird from '../../../../assets/images/bird.png';
import type { PipesPositionsConfig } from '../pipe/pipe';
import { BirdConstants } from './bird-constants';

export class Bird {
  score = 0;
  jumpCounter = 0;
  shouldJump = false;
  private readonly x: number;
  private y: number;
  private readonly size: number;
  private readonly jumpHeight: number;
  private readonly fallHeight: number;
  private spin: number;
  private readonly spinIncrement: number;
  private ctx: CanvasRenderingContext2D;
  private readonly bird: HTMLImageElement;
  private pipeHitChecking = false;

  constructor(ctx: CanvasRenderingContext2D) {
    this.bird = new Image();
    this.bird.src = bird as string;
    this.ctx = ctx;
    this.y = ctx.canvas.height / 2;
    this.x = BirdConstants.INDENT_LEFT;
    this.size = BirdConstants.SIZE;
    this.jumpHeight = BirdConstants.JUMP_HEIGHT;
    this.fallHeight = BirdConstants.FALL_HEIGHT;
    this.spinIncrement = BirdConstants.SPIN_INCREMENT;
    this.shouldJump = false;
    this.jumpCounter = 0;
    this.spin = 0;
  }

  draw(pipesPositionsConfig: PipesPositionsConfig) {
    if (
      pipesPositionsConfig.x <= BirdConstants.START_HIT_X &&
      pipesPositionsConfig.x >= BirdConstants.END_HIT_X
    ) {
      this.pipeHitChecking = true;

      if (this.checkPipeHit(pipesPositionsConfig)) {
        this.ctx.drawImage(this.bird, this.x, this.y);

        return true;
      }
    } else if (pipesPositionsConfig.x < BirdConstants.END_HIT_X && this.pipeHitChecking) {
      this.pipeHitChecking = false;
      this.score += 1;
    }

    this.jump();

    if (this.y >= this.ctx.canvas.height - BirdConstants.BIRD_HEIGHT) {
      this.ctx.drawImage(this.bird, this.x, this.ctx.canvas.height - BirdConstants.BIRD_HEIGHT);

      return true;
    }

    this.ctx.drawImage(this.bird, this.x, this.y);

    if (this.shouldJump) {
      this.counterRotation();
    }

    return false;
  }

  jump() {
    if (this.shouldJump) {
      this.jumpCounter += 1;

      if (this.y > this.jumpHeight) {
        this.y -= this.jumpHeight;
      }

      this.rotation();

      if (this.jumpCounter >= BirdConstants.BIRD_JUMP_COUNTER) {
        this.counterRotation();
        this.spin = 0;
        this.shouldJump = false;
      }
    } else if (this.y < this.ctx.canvas.height - BirdConstants.BIRD_HEIGHT) {
      this.y += this.fallHeight;
    }
  }

  rotation() {
    const offsetXPosition = this.x + this.size / 2;
    const offsetYPosition = this.y + this.size / 2;

    this.ctx.translate(offsetXPosition, offsetYPosition);
    this.ctx.rotate((-this.spin * Math.PI) / 180);
    this.ctx.rotate((-this.spinIncrement * Math.PI) / 180);
    this.ctx.translate(-offsetXPosition, -offsetYPosition);
    this.spin += this.spinIncrement;
  }

  counterRotation() {
    const offsetXPosition = this.x + this.size / 2;
    const offsetYPosition = this.y + this.size / 2;

    this.ctx.translate(offsetXPosition, offsetYPosition);
    this.ctx.rotate((this.spin * Math.PI) / 180);
    this.ctx.translate(-offsetXPosition, -offsetYPosition);
  }

  private checkPipeHit(pipesPositionsConfig: PipesPositionsConfig): boolean {
    return (
      this.y < pipesPositionsConfig.y ||
      this.y > pipesPositionsConfig.y + PipeConstants.GAP_BETWEEN_PIPES - this.bird.height
    );
  }
}
