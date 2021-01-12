import { TestBed } from '@angular/core/testing';

import { PokemonInfoGuard } from './pokemon-info.guard';

describe('PokemonInfoGuard', () => {
  let guard: PokemonInfoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PokemonInfoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
