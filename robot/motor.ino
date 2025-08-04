void maju() {
  const int _speed_ = map(MOTOR_SPEED, 0, 100, 0 , 255);

  digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW);
  analogWrite(ENA1, _speed_);

  digitalWrite(IN3, HIGH); digitalWrite(IN4, LOW);
  analogWrite(ENB1, _speed_);

  digitalWrite(IN5, HIGH); digitalWrite(IN6, LOW);
  analogWrite(ENA2, _speed_);

  digitalWrite(IN7, HIGH); digitalWrite(IN8, LOW);
  analogWrite(ENB2, _speed_);
}

void mundur() {
  const int _speed_ = map(MOTOR_SPEED, 0, 100, 0 , 255);

  digitalWrite(IN1, LOW); digitalWrite(IN2, HIGH);
  analogWrite(ENA1, _speed_);

  digitalWrite(IN3, LOW); digitalWrite(IN4, HIGH);
  analogWrite(ENB1, _speed_);

  digitalWrite(IN5, LOW); digitalWrite(IN6, HIGH);
  analogWrite(ENA2, _speed_);

  digitalWrite(IN7, LOW); digitalWrite(IN8, HIGH);
  analogWrite(ENB2, _speed_);
}

void kanan() {
  const int _speed_ = map(MOTOR_SPEED, 0, 100, 0 , 150);

  digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW);
  analogWrite(ENA1, _speed_);

  digitalWrite(IN3, LOW); digitalWrite(IN4, HIGH);
  analogWrite(ENB1, _speed_);

  digitalWrite(IN5, HIGH); digitalWrite(IN6, LOW);
  analogWrite(ENA2, _speed_);

  digitalWrite(IN7, HIGH); digitalWrite(IN8, LOW);
  analogWrite(ENB2, _speed_);
}

void kiri() {
  const int _speed_ = map(MOTOR_SPEED, 0, 100, 0 , 150);

  digitalWrite(IN1, LOW); digitalWrite(IN2, HIGH);
  analogWrite(ENA1, _speed_);

  digitalWrite(IN3, HIGH); digitalWrite(IN4, LOW);
  analogWrite(ENB1, _speed_);

  digitalWrite(IN5, HIGH); digitalWrite(IN6, LOW);
  analogWrite(ENA2, _speed_);

  digitalWrite(IN7, HIGH); digitalWrite(IN8, LOW);
  analogWrite(ENB2, _speed_);
}

void putarKanan() {
  const int _speed_ = map(MOTOR_SPEED, 0, 100, 0 , 150);

  digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW);
  analogWrite(ENA1, _speed_);

  digitalWrite(IN3, LOW); digitalWrite(IN4, HIGH);
  analogWrite(ENB1, _speed_);

  digitalWrite(IN5, HIGH); digitalWrite(IN6, LOW);
  analogWrite(ENA2, _speed_);

  digitalWrite(IN7, LOW); digitalWrite(IN8, HIGH);
  analogWrite(ENB2, _speed_);
}

void putarKiri() {
  const int _speed_ = map(MOTOR_SPEED, 0, 100, 0 , 150);

  digitalWrite(IN1, LOW); digitalWrite(IN2, HIGH);
  analogWrite(ENA1, _speed_);

  digitalWrite(IN3, HIGH); digitalWrite(IN4, LOW);
  analogWrite(ENB1, _speed_);

  digitalWrite(IN5, LOW); digitalWrite(IN6, HIGH);
  analogWrite(ENA2, _speed_);

  digitalWrite(IN7, HIGH); digitalWrite(IN8, LOW);
  analogWrite(ENB2, _speed_);
}

void berhenti() {
  mundur();

  delay(100);

  digitalWrite(IN1, LOW); digitalWrite(IN2, LOW); analogWrite(ENA1, 0);
  digitalWrite(IN3, LOW); digitalWrite(IN4, LOW); analogWrite(ENB1, 0);
  digitalWrite(IN5, LOW); digitalWrite(IN6, LOW); analogWrite(ENA2, 0);
  digitalWrite(IN7, LOW); digitalWrite(IN8, LOW); analogWrite(ENB2, 0);
}