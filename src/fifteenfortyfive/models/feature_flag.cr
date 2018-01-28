class FeatureFlag < Crecto::Model
  schema "feature_flags" do
    field :name, String
    field :enabled, Bool, default: true

    set_created_at_field nil
    set_updated_at_field nil
  end

  def self.enabled?(name : String)
    flag = Repo.get_by(FeatureFlag, name: name)
    flag.try(&.enabled) || false
  end

  def self.enable(name)
    if flag = Repo.get_by(FeatureFlag, name: name)
      flag.enabled = true
      Repo.update(flag)
    else
      flag = FeatureFlag.new
      flag.name = name
      flag.enabled = true
      Repo.insert(flag)
    end
  end

  def self.disable(name)
    if flag = Repo.get_by(FeatureFlag, name: name)
      flag.enabled = false
      Repo.update(flag)
    else
      flag = FeatureFlag.new
      flag.name = name
      flag.enabled = false
      Repo.insert(flag)
    end
  end
end
