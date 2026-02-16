import { describe, expect, test } from '@jest/globals';
import { otherPlayer, playerToString, scoreWhenDeuce, stringToPlayer, advantage, scoreWhenAdvantage, game, deuce, stringToPoint, scoreWhenForty, forty, thirty, points, love, fifteen, scoreWhenPoint, score } from '..';

describe('Tests for tooling functions', () => {
  test('Given playerOne when playerToString', () => {
    expect(playerToString('PLAYER_ONE')).toStrictEqual('Player 1');
  });

  test('Given playerOne when otherPlayer', () => {
    expect(otherPlayer('PLAYER_ONE')).toStrictEqual('PLAYER_TWO');
  });
});

describe('Tests for transition functions', () => {
  test('Given deuce, score is advantage to winner', () => {
    ['PLAYER_ONE', 'PLAYER_TWO'].forEach((w) => {
      const scoreCurrent = scoreWhenDeuce(stringToPlayer(w));
      const scoreExpected = advantage(stringToPlayer(w));
      expect(scoreCurrent).toStrictEqual(scoreExpected);
    })
  });

  test('Given advantage when advantagedPlayer wins, score is Game avantagedPlayer', () => {
    ['PLAYER_ONE', 'PLAYER_TWO'].forEach((advantaged) => {
      const advantagedPlayer = stringToPlayer(advantaged);
      const winner = advantagedPlayer;
      const scoreCurrent = scoreWhenAdvantage(advantagedPlayer, winner);
      const scoreExpected = game(winner);
      expect(scoreCurrent).toStrictEqual(scoreExpected);
    })
  });

  test('Given advantage when otherPlayer wins, score is Deuce', () => {
    ['PLAYER_ONE', 'PLAYER_TWO'].forEach((advantaged) => {
      const advantagedPlayer = stringToPlayer(advantaged);
      const winner = otherPlayer(advantagedPlayer);
      const scoreCurrent = scoreWhenAdvantage(advantagedPlayer, winner);
      const scoreExpected = deuce();
      expect(scoreCurrent).toStrictEqual(scoreExpected);
    })
  });

  test('Given a player at 40 when the same player wins, score is Game for this player', () => {
    ['PLAYER_ONE', 'PLAYER_TWO'].forEach((winner) => {
      const fortyData = {
        player: stringToPlayer(winner),
        otherPoint: stringToPoint('THIRTY'),
      };
      const scoreCurrent = scoreWhenForty(fortyData, stringToPlayer(winner));
      const scoreExpected = game(stringToPlayer(winner));
      expect(scoreCurrent).toStrictEqual(scoreExpected);
    })
  });

  test('Given player at 40 and other at 30 when other wins, score is Deuce', () => {
    ['PLAYER_ONE', 'PLAYER_TWO'].forEach((winner) => {
      const fortyData = {
        player: otherPlayer(stringToPlayer(winner)),
        otherPoint: stringToPoint('THIRTY'),
      };
      const scoreCurrent = scoreWhenForty(fortyData, stringToPlayer(winner));
      const scoreExpected = deuce();
      expect(scoreCurrent).toStrictEqual(scoreExpected);
    })
  });

  test('Given player at 40 and other at 15 when other wins, score is 40 - 30', () => {
    ['PLAYER_ONE', 'PLAYER_TWO'].forEach((winner) => {
      const fortyData = {
        player: otherPlayer(stringToPlayer(winner)),
        otherPoint: stringToPoint('FIFTEEN'),
      };
      const scoreCurrent = scoreWhenForty(fortyData, stringToPlayer(winner));
      const scoreExpected = forty(fortyData.player, thirty());
      expect(scoreCurrent).toStrictEqual(scoreExpected);
    })
  });

  test('Given players at 0 or 15 points score kind is still POINTS', () => {
    const p1 = love();
    const p2 = fifteen();
    const currentPoints = points(p1, p2);
    const scoreCurrent = scoreWhenPoint(currentPoints.pointsData, 'PLAYER_ONE');
    expect(scoreCurrent.kind).toStrictEqual('POINTS');
  });

  test('Given one player at 30 and win, score is forty', () => {
    const p1 = thirty();
    const p2 = fifteen();
    const currentPoints = points(p1, p2);
    const scoreCurrent = scoreWhenPoint(currentPoints.pointsData, 'PLAYER_ONE');
    expect(scoreCurrent.kind).toStrictEqual('FORTY');
  });
});
