class HTTP::Server::Context
  property feature_flags = {} of String => FeatureFlag
end

class FeatureFlagHandler < Kemal::Handler
  def call(env)
    env.feature_flags = Repo.all(FeatureFlag).each_with_object({} of String => FeatureFlag) do |flag, acc|
      acc[flag.name.not_nil!] = flag
    end

    call_next(env)
  end
end
