Factory.define :user, :class => User do |f|
  f.login                 'duffman'
  f.password              'says_oh_yeah!'
  f.password_confirmation 'says_oh_yeah!'
end